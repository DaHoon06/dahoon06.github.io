import Parser from "rss-parser";
import { BaseCollector } from "./base-collector";
import type { CollectedItem } from "./types";

const parser = new Parser({
    timeout: 12_000,
    headers: {
        "User-Agent":
            "Mozilla/5.0 (compatible; dahoon06-news/1.0; +https://blog.dahoon06.com)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
    },
});

const MAX_PER_FEED = 15;

export class RssCollector extends BaseCollector {
    protected async fetchItems(): Promise<CollectedItem[]> {
        const feed = await parser.parseURL(this.source.url);

        return (feed.items ?? []).slice(0, MAX_PER_FEED).map((item) =>
            this.buildItem({
                url: item.link ?? "",
                title: (item.title ?? "").trim(),
                summary: this.toSummary(
                    item.contentSnippet ?? item.content ?? item.summary
                ),
                publishedAt: this.safeDate(item.isoDate ?? item.pubDate),
                tags: item.categories?.slice(0, 3),
            })
        );
    }
}
