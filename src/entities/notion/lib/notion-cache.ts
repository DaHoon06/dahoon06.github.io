import fs from "fs";
import path from "path";
import zlib from "zlib";
import { ExtendedRecordMap } from "notion-types";
import { PostsType } from "../model/post.types";

/**
 * Notion 응답을 저장소에 미리 캐싱해 두기 위한 레이어.
 *
 * GitHub Actions에서 `next build`를 돌리면 목록 페이지 3곳 + 상세 페이지 전부가
 * Notion을 직접 호출해 429(Too Many Requests)가 났다. 그래서 로컬에서
 * `npm run notion:cache`로 목록과 recordMap을 전부 받아 커밋해 두고,
 * 빌드는 이 파일들만 읽게 한다. CI는 Notion을 한 번도 호출하지 않는다.
 *
 * recordMap은 한 건당 평균 600KB라 그대로 두면 저장소가 너무 커진다.
 * gzip으로 저장하면 10% 수준(≈60KB)으로 줄어 그대로 커밋할 수 있다.
 */
const CACHE_DIR = path.join(process.cwd(), "posts");
const RECORD_MAP_DIR = path.join(CACHE_DIR, "record-maps");

export const notionCachePaths = {
    dir: CACHE_DIR,
    posts: path.join(CACHE_DIR, "cachedPosts.json"),
    archiving: path.join(CACHE_DIR, "cachedArchiving.json"),
    recordMapDir: RECORD_MAP_DIR,
    recordMap: (id: string) => path.join(RECORD_MAP_DIR, `${id}.json.gz`),
    manifest: path.join(RECORD_MAP_DIR, "manifest.json"),
};

const MISSING_CACHE_HINT =
    "`npm run notion:cache`로 캐시를 만든 뒤 커밋해야 합니다.";

const readJsonFile = <T>(file: string, label: string): T => {
    if (!fs.existsSync(file)) {
        throw new Error(
            `[notion-cache] ${label} 캐시가 없습니다: ${file}\n${MISSING_CACHE_HINT}`
        );
    }
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
};

export const readCachedPosts = (): PostsType =>
    readJsonFile<PostsType>(notionCachePaths.posts, "포스트 목록");

export const readCachedArchiving = (): PostsType =>
    readJsonFile<PostsType>(notionCachePaths.archiving, "아카이빙 목록");

export const readCachedRecordMap = (id: string): ExtendedRecordMap => {
    const file = notionCachePaths.recordMap(id);
    if (!fs.existsSync(file)) {
        throw new Error(
            `[notion-cache] recordMap 캐시가 없습니다 (id: ${id}): ${file}\n${MISSING_CACHE_HINT}`
        );
    }
    return JSON.parse(
        zlib.gunzipSync(fs.readFileSync(file)).toString("utf8")
    ) as ExtendedRecordMap;
};

/* ------------------------------------------------------------------ */
/* 아래는 캐시 생성 스크립트 전용 (빌드 시점에는 쓰이지 않는다)         */
/* ------------------------------------------------------------------ */

export type RecordMapManifest = Record<string, string>;

export const readRecordMapManifest = (): RecordMapManifest => {
    if (!fs.existsSync(notionCachePaths.manifest)) return {};
    try {
        return JSON.parse(
            fs.readFileSync(notionCachePaths.manifest, "utf8")
        ) as RecordMapManifest;
    } catch {
        return {};
    }
};

export const writeJsonCache = (file: string, data: unknown) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
};

export const writeRecordMapCache = (id: string, recordMap: unknown) => {
    fs.mkdirSync(RECORD_MAP_DIR, { recursive: true });
    fs.writeFileSync(
        notionCachePaths.recordMap(id),
        zlib.gzipSync(Buffer.from(JSON.stringify(recordMap)), { level: 9 })
    );
};

export const listCachedRecordMapIds = (): string[] => {
    if (!fs.existsSync(RECORD_MAP_DIR)) return [];
    return fs
        .readdirSync(RECORD_MAP_DIR)
        .filter((name) => name.endsWith(".json.gz"))
        .map((name) => name.replace(/\.json\.gz$/, ""));
};

export const removeRecordMapCache = (id: string) => {
    fs.rmSync(notionCachePaths.recordMap(id), { force: true });
};
