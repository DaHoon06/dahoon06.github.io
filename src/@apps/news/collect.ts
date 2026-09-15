import fs from "fs";
import path from "path";
import type { NewsArchive, NewsItem } from "@entities/news/model/news.types";
import {
    NEWS_DIR,
    listNewsDates,
    readNewsArchive,
} from "@entities/news/lib/news-archive";
import { NEWS_SOURCES } from "./config/sources";
import { createCollector } from "./collectors";
import type { CollectedItem, CollectorResult } from "./collectors/types";
import { mapWithConcurrency } from "./lib/async";
import { buildDedupContext, dedup } from "./lib/dedup";
import { calculateScore } from "./lib/scoring";
import { uniqueSlug } from "./lib/slug";

/**
 * 개발 뉴스 수집 → `data/news/YYYY-MM-DD.json` 저장.
 *
 * 데이터베이스가 없는 대신 **저장소에 커밋된 JSON 자체가 이력**이다.
 * 중복 제거도 최근 아카이브 파일을 읽어서 한다 (lib/dedup.ts).
 * AI 요약은 쓰지 않는다 — summary 는 원문 피드가 준 발췌 그대로다.
 *
 *   npm run news:collect            수집 후 저장
 *   NEWS_DRY_RUN=true npm run news:collect   저장 없이 결과만 출력
 */

const MAX_ITEMS = Number(process.env.NEWS_MAX_ITEMS ?? 40);
/** 한 소스가 목록을 도배하지 않도록 하루치 상한을 둔다 */
const MAX_PER_SOURCE = Number(process.env.NEWS_MAX_PER_SOURCE ?? 4);
/**
 * 그룹 상한. 커뮤니티는 매일 쏟아지고 프레임워크 공식 블로그는 며칠에 한 번 쓴다 —
 * 상한이 없으면 목록이 커뮤니티로만 채워진다.
 */
const MAX_PER_GROUP = Number(
    process.env.NEWS_MAX_PER_GROUP ?? Math.ceil(MAX_ITEMS * 0.6)
);
/** 이보다 오래된 글은 "오늘의 소식"이 아니다 */
const MAX_AGE_DAYS = Number(process.env.NEWS_MAX_AGE_DAYS ?? 5);
const CONCURRENCY = 8;
const isDryRun = process.env.NEWS_DRY_RUN === "true";

/** GitHub Actions 는 UTC 로 돈다 — 파일명은 KST 기준으로 맞춘다 */
const kstToday = (): string =>
    new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10);

const main = async () => {
    const date = kstToday();
    const startedAt = Date.now();

    console.log(
        `⚡ 뉴스 수집 시작 (${date} KST, 소스 ${NEWS_SOURCES.length}개)`
    );

    // 1. 지난 아카이브 = 중복 제거 이력
    const archives = listNewsDates()
        .map((day) => readNewsArchive(day))
        .filter((archive): archive is NewsArchive => archive !== null);
    const context = buildDedupContext(archives, date);
    console.log(
        `   이력: 아카이브 ${archives.length}일 · URL ${context.seenUrls.size}건`
    );

    // 2. 수집
    const results = await mapWithConcurrency(
        NEWS_SOURCES,
        CONCURRENCY,
        (source) => createCollector(source).collect()
    );
    reportFailures(results);

    const collected = results.flatMap((result) => result.items);
    console.log(`   수집: ${collected.length}건`);

    // 3. 오래된 글 제외 → 중복 제거 → 점수 정렬
    const fresh = collected.filter((item) => isFresh(item));
    const unique = dedup(fresh, context);
    console.log(
        `   신선도 필터 ${fresh.length}건 → 중복 제거 ${unique.length}건`
    );

    const existing = readNewsArchive(date)?.items ?? [];
    const takenSlugs = new Set(existing.map((item) => item.slug));

    const ranked = unique
        .map((item) => ({ item, score: calculateScore(item) }))
        .sort((a, b) => b.score - a.score);

    const scored: NewsItem[] = selectBalanced(
        ranked,
        Math.max(MAX_ITEMS - existing.length, 0),
        existing
    ).map(({ item, score }) => ({
        slug: uniqueSlug(item.title, takenSlugs),
        title: item.title,
        url: item.url,
        summary: item.summary,
        sourceId: item.sourceId,
        sourceName: item.sourceName,
        group: item.group,
        language: item.language,
        publishedAt: item.publishedAt,
        contentType: item.contentType,
        ...(item.engagement ? { engagement: item.engagement } : {}),
        ...(item.tags?.length ? { tags: item.tags } : {}),
        score,
    }));

    // 4. 같은 날 재실행을 대비해 기존 항목은 유지하고 새 항목만 얹는다
    const items = [...existing, ...scored].sort((a, b) => b.score - a.score);

    const archive: NewsArchive = {
        date,
        collectedAt: new Date().toISOString(),
        items,
    };

    if (isDryRun) {
        console.log("🔍 DRY_RUN — 저장하지 않음");
        items.slice(0, 10).forEach((item, index) => {
            console.log(
                `   ${String(index + 1).padStart(2)}. [${item.score}] ${item.sourceName} — ${item.title}`
            );
        });
        return;
    }

    fs.mkdirSync(NEWS_DIR, { recursive: true });
    const file = path.join(NEWS_DIR, `${date}.json`);
    fs.writeFileSync(file, `${JSON.stringify(archive, null, 2)}\n`);

    console.log(
        `✅ ${file} 저장 (신규 ${scored.length}건 · 총 ${items.length}건 · ${Date.now() - startedAt}ms)`
    );
};

interface RankedItem {
    item: CollectedItem;
    score: number;
}

const countBy = <T>(
    items: T[],
    key: (item: T) => string
): Map<string, number> => {
    const counts = new Map<string, number>();
    items.forEach((item) =>
        counts.set(key(item), (counts.get(key(item)) ?? 0) + 1)
    );
    return counts;
};

/**
 * 점수순을 유지하되 소스·그룹 상한을 지켜 뽑는다.
 * Hacker News 처럼 한 번에 많이 올라오는 소스/그룹이 하루치를 덮는 것을 막는다.
 * 상한 때문에 `limit` 을 못 채우면 그대로 적게 담는다 — 채우려고 품질을 낮추지 않는다.
 */
const selectBalanced = (
    ranked: RankedItem[],
    limit: number,
    existing: NewsItem[]
): RankedItem[] => {
    const bySource = countBy(existing, (item) => item.sourceId);
    const byGroup = countBy(existing, (item) => item.group);
    const picked: RankedItem[] = [];

    for (const entry of ranked) {
        if (picked.length >= limit) break;

        const { sourceId, group } = entry.item;
        if ((bySource.get(sourceId) ?? 0) >= MAX_PER_SOURCE) continue;
        if ((byGroup.get(group) ?? 0) >= MAX_PER_GROUP) continue;

        bySource.set(sourceId, (bySource.get(sourceId) ?? 0) + 1);
        byGroup.set(group, (byGroup.get(group) ?? 0) + 1);
        picked.push(entry);
    }

    return picked;
};

const isFresh = (item: CollectedItem): boolean => {
    const published = new Date(item.publishedAt).getTime();
    if (Number.isNaN(published)) return false;
    return (Date.now() - published) / 86_400_000 <= MAX_AGE_DAYS;
};

const reportFailures = (results: CollectorResult[]): void => {
    const failed = results.filter((result) => result.error);
    if (failed.length === 0) return;

    console.warn(`⚠️  수집 실패 ${failed.length}개 소스`);
    failed.forEach((result) =>
        console.warn(`   - ${result.sourceId}: ${result.error}`)
    );
};

main().catch((error) => {
    console.error("❌ 수집 실패", error);
    process.exit(1);
});
