import type { NewsArchive } from "@entities/news/model/news.types";
import type { CollectedItem } from "../collectors/types";

/** 같은 URL 을 다시 올리지 않는 기간 */
export const URL_WINDOW_DAYS = 30;
/** 같은 제목(=같은 스토리)이 다른 URL 로 재등장하는 것을 막는 기간 */
export const TITLE_WINDOW_DAYS = 3;

/** 추적 파라미터·프래그먼트를 떼어 같은 글을 같은 키로 만든다 */
export const normalizeUrl = (url: string): string => {
    try {
        const parsed = new URL(url);
        parsed.hash = "";
        [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_content",
            "utm_term",
            "ref",
            "source",
        ].forEach((key) => parsed.searchParams.delete(key));
        return parsed.toString().replace(/\/+$/, "");
    } catch {
        return url;
    }
};

/** 대소문자·기호·공백을 무시한 제목 키 */
export const normalizeTitle = (title: string): string =>
    title
        .toLowerCase()
        .replace(/[^\w가-힣]/g, "")
        .slice(0, 80);

export interface DedupContext {
    seenUrls: Set<string>;
    recentTitles: Set<string>;
}

/**
 * 커밋된 아카이브 JSON 이 곧 중복 제거용 이력이다 (SQLite 를 쓰지 않는 이유).
 * `archives` 는 최신순으로 들어온다고 가정한다.
 */
export const buildDedupContext = (
    archives: NewsArchive[],
    today: string
): DedupContext => {
    const seenUrls = new Set<string>();
    const recentTitles = new Set<string>();

    for (const archive of archives) {
        const age = daysBetween(archive.date, today);
        if (age > URL_WINDOW_DAYS) continue;

        for (const item of archive.items) {
            seenUrls.add(normalizeUrl(item.url));
            if (age <= TITLE_WINDOW_DAYS) {
                recentTitles.add(normalizeTitle(item.title));
            }
        }
    }

    return { seenUrls, recentTitles };
};

export const dedup = (
    items: CollectedItem[],
    context: DedupContext
): CollectedItem[] => {
    const urls = new Set(context.seenUrls);
    const titles = new Set(context.recentTitles);
    const result: CollectedItem[] = [];

    for (const item of items) {
        const url = normalizeUrl(item.url);
        const title = normalizeTitle(item.title);

        if (urls.has(url) || titles.has(title)) continue;

        urls.add(url);
        titles.add(title);
        result.push(item);
    }

    return result;
};

const daysBetween = (from: string, to: string): number => {
    const diff =
        new Date(`${to}T00:00:00Z`).getTime() -
        new Date(`${from}T00:00:00Z`).getTime();
    return Math.round(diff / 86_400_000);
};
