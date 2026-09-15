import type {
    NewsContentType,
    NewsGroupId,
    NewsLanguage,
} from "@entities/news/model/news.types";

/** 점수·slug 가 붙기 전의 원시 수집 결과 */
export interface CollectedItem {
    url: string;
    title: string;
    summary: string;
    sourceId: string;
    sourceName: string;
    group: NewsGroupId;
    language: NewsLanguage;
    /** ISO 8601 */
    publishedAt: string;
    contentType: NewsContentType;
    engagement?: number;
    tags?: string[];
}

export interface CollectorResult {
    sourceId: string;
    items: CollectedItem[];
    error?: string;
}
