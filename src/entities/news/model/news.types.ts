/**
 * 개발 뉴스 아카이브 도메인 모델.
 *
 * 수집 스크립트(`src/@apps/news`)와 화면이 함께 쓰는 유일한 계약이다.
 * 수집 결과는 `data/news/YYYY-MM-DD.json` 으로 저장되어 저장소에 커밋되고,
 * 빌드 시 `getStaticProps` 가 그 파일을 읽어 정적 페이지를 만든다.
 */

/** 화면에서 묶어 보여주는 소스 그룹 */
export type NewsGroupId = "framework" | "korean" | "community" | "newsletter";

export type NewsContentType = "article" | "repo" | "discussion";

export type NewsLanguage = "en" | "ko";

export interface NewsItem {
    /** 날짜 안에서 유일한 식별자 */
    slug: string;
    title: string;
    url: string;
    /** 원문 피드가 제공한 발췌. AI 요약이 아니다 */
    summary: string;
    sourceId: string;
    sourceName: string;
    group: NewsGroupId;
    language: NewsLanguage;
    /** ISO 8601 */
    publishedAt: string;
    contentType: NewsContentType;
    /** HN 포인트, GitHub 스타 등 (수집 가능한 소스만) */
    engagement?: number;
    tags?: string[];
    /** 정렬용 점수 — scoring.ts 참고 */
    score: number;
}

export interface NewsArchive {
    /** KST 기준 YYYY-MM-DD */
    date: string;
    /** 수집 시각 (ISO 8601) */
    collectedAt: string;
    items: NewsItem[];
}

/** 목록/네비게이션용 경량 요약 */
export interface NewsArchiveSummary {
    date: string;
    count: number;
}
