import fs from "fs";
import path from "path";
import type { NewsArchive, NewsArchiveSummary } from "../model/news.types";

/**
 * 빌드 타임 전용. `getStaticProps` / `getStaticPaths` 에서만 호출한다.
 *
 * 뉴스 데이터는 DB가 아니라 저장소에 커밋된 JSON이다.
 * GitHub Actions 가 하루 한 번 `npm run news:collect` 로 `data/news/YYYY-MM-DD.json`
 * 을 만들어 커밋하고, 그 커밋을 그대로 빌드해 정적 페이지를 만든다.
 */
export const NEWS_DIR = path.join(process.cwd(), "data", "news");

const DATE_FILE = /^\d{4}-\d{2}-\d{2}\.json$/;

/** 최신순 날짜 목록 */
export const listNewsDates = (): string[] => {
    if (!fs.existsSync(NEWS_DIR)) return [];

    return fs
        .readdirSync(NEWS_DIR)
        .filter((file) => DATE_FILE.test(file))
        .map((file) => file.replace(/\.json$/, ""))
        .sort((a, b) => b.localeCompare(a));
};

export const readNewsArchive = (date: string): NewsArchive | null => {
    const file = path.join(NEWS_DIR, `${date}.json`);
    if (!DATE_FILE.test(`${date}.json`) || !fs.existsSync(file)) return null;

    try {
        return JSON.parse(fs.readFileSync(file, "utf8")) as NewsArchive;
    } catch {
        // 깨진 JSON 때문에 빌드가 멈추지 않게 한다 — 그날 치만 비워진다
        return null;
    }
};

export const readLatestNewsArchive = (): NewsArchive | null => {
    const [latest] = listNewsDates();
    return latest ? readNewsArchive(latest) : null;
};

/** 사이드 네비게이션용 — 날짜 + 건수만 */
export const readNewsArchiveSummaries = (limit = 30): NewsArchiveSummary[] => {
    return listNewsDates()
        .slice(0, limit)
        .map((date) => ({
            date,
            count: readNewsArchive(date)?.items.length ?? 0,
        }));
};
