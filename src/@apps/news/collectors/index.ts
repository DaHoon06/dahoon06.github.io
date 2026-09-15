import type { NewsSource } from "../config/sources";
import type { BaseCollector } from "./base-collector";
import { GithubTrendingCollector } from "./github-trending-collector";
import { HackernewsCollector } from "./hackernews-collector";
import { RssCollector } from "./rss-collector";

export type { CollectedItem, CollectorResult } from "./types";

export const createCollector = (source: NewsSource): BaseCollector => {
    switch (source.type) {
        case "hackernews":
            return new HackernewsCollector(source);
        case "github-trending":
            return new GithubTrendingCollector(source);
        case "rss":
        default:
            return new RssCollector(source);
    }
};
