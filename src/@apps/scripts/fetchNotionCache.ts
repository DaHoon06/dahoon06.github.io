import "dotenv/config";
import dotenv from "dotenv";

import { getArchiving, getPosts, getRecordMap } from "@entities/notion";
import type { PostType } from "@entities/notion";
import {
    listCachedRecordMapIds,
    notionCachePaths,
    readRecordMapManifest,
    removeRecordMapCache,
    writeJsonCache,
    writeRecordMapCache,
    type RecordMapManifest,
} from "@entities/notion/lib/notion-cache";

dotenv.config({ path: ".env" });

/**
 * Notion 전체 캐시 생성 스크립트.
 *
 * 목록(cachedPosts/cachedArchiving)뿐 아니라 상세 페이지의 recordMap까지 전부 받아
 * `posts/` 아래에 저장한다. 이 결과물을 커밋해 두면 CI의 `next build`는
 * Notion을 한 번도 호출하지 않으므로 429가 나지 않는다.
 *
 * 기본은 증분 갱신 — Notion의 last_edited_time이 바뀐 글만 다시 받는다.
 * `npm run notion:cache -- --force` 로 전체를 다시 받을 수 있다.
 */
const force = process.argv.includes("--force");

const main = async () => {
    console.log("⚡ Fetching posts from Notion...");
    const posts = await getPosts();
    writeJsonCache(notionCachePaths.posts, posts);
    console.log(`   posts: ${posts.length}건 → ${notionCachePaths.posts}`);

    console.log("⚡ Fetching archiving from Notion...");
    const archiving = await getArchiving();
    writeJsonCache(notionCachePaths.archiving, archiving);
    console.log(
        `   archiving: ${archiving.length}건 → ${notionCachePaths.archiving}`
    );

    const targets: PostType[] = [...posts, ...archiving];
    const manifest: RecordMapManifest = force ? {} : readRecordMapManifest();
    const nextManifest: RecordMapManifest = {};
    const cachedIds = new Set(listCachedRecordMapIds());

    let fetched = 0;
    let skipped = 0;

    console.log(`⚡ Fetching recordMaps (${targets.length}건)...`);
    for (const target of targets) {
        const stamp = target.lastEditedTime ?? "";
        const isFresh =
            !force && cachedIds.has(target.id) && manifest[target.id] === stamp;

        if (isFresh) {
            nextManifest[target.id] = stamp;
            skipped += 1;
            continue;
        }

        const recordMap = await getRecordMap(target.id);
        writeRecordMapCache(target.id, recordMap);
        nextManifest[target.id] = stamp;
        // 중간에 실패해도 다음 실행이 여기서부터 이어갈 수 있도록 매번 기록한다.
        writeJsonCache(notionCachePaths.manifest, {
            ...manifest,
            ...nextManifest,
        });
        fetched += 1;
        console.log(`   ✓ ${target.slug} (${target.id})`);
    }

    // 목록에서 사라진 글의 캐시는 정리한다.
    const validIds = new Set(targets.map((target) => target.id));
    let pruned = 0;
    for (const id of cachedIds) {
        if (validIds.has(id)) continue;
        removeRecordMapCache(id);
        pruned += 1;
    }

    writeJsonCache(notionCachePaths.manifest, nextManifest);

    console.log(
        `\n✅ recordMap: ${fetched}건 갱신 / ${skipped}건 재사용 / ${pruned}건 정리`
    );
    console.log(
        "   변경된 posts/ 파일을 커밋하면 CI 빌드에서 Notion을 호출하지 않습니다."
    );
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
