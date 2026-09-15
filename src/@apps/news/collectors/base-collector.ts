import type { NewsSource } from "../config/sources";
import { withRetry } from "../lib/async";
import type { CollectedItem, CollectorResult } from "./types";

/** 한 소스가 실패해도 전체 수집은 계속된다 — 실패는 결과에 담아 돌려준다 */
export abstract class BaseCollector {
    constructor(protected readonly source: NewsSource) {}

    async collect(): Promise<CollectorResult> {
        try {
            const items = await withRetry(
                () => this.fetchItems(),
                this.source.id
            );
            return {
                sourceId: this.source.id,
                items: items.filter((item) => this.isValid(item)),
            };
        } catch (error) {
            return {
                sourceId: this.source.id,
                items: [],
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }

    protected abstract fetchItems(): Promise<CollectedItem[]>;

    protected isValid(item: CollectedItem): boolean {
        return Boolean(item.url?.startsWith("http") && item.title);
    }

    protected buildItem(
        partial: Pick<CollectedItem, "url" | "title"> & Partial<CollectedItem>
    ): CollectedItem {
        return {
            summary: "",
            sourceId: this.source.id,
            sourceName: this.source.name,
            group: this.source.group,
            language: this.source.language,
            publishedAt: new Date().toISOString(),
            contentType: "article",
            ...partial,
        };
    }

    /** 태그 제거 + 공백 정리 후 발췌 */
    protected toSummary(raw: string | undefined, max = 220): string {
        if (!raw) return "";
        return raw
            .replace(/<[^>]*>/g, " ")
            .replace(/&[a-z]+;/gi, " ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, max);
    }

    protected safeDate(raw: string | undefined): string {
        if (!raw) return new Date().toISOString();
        const date = new Date(raw);
        return Number.isNaN(date.getTime())
            ? new Date().toISOString()
            : date.toISOString();
    }
}
