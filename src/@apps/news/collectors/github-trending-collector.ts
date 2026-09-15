import * as cheerio from "cheerio";
import { fetchWithTimeout } from "../lib/fetch";
import { BaseCollector } from "./base-collector";
import type { CollectedItem } from "./types";

const MAX_REPOS = 12;

/** GitHub Trending 은 공개 API가 없어 HTML을 파싱한다 */
export class GithubTrendingCollector extends BaseCollector {
    protected async fetchItems(): Promise<CollectedItem[]> {
        const res = await fetchWithTimeout(this.source.url, {
            headers: { Accept: "text/html" },
        });
        if (!res.ok) throw new Error(`GitHub Trending ${res.status}`);

        const $ = cheerio.load(await res.text());
        const items: CollectedItem[] = [];

        $("article.Box-row").each((_, element) => {
            if (items.length >= MAX_REPOS) return false;

            const repoPath = $(element).find("h2 a").attr("href")?.trim();
            if (!repoPath) return;

            const language = $(element)
                .find("[itemprop='programmingLanguage']")
                .text()
                .trim();
            const stars = Number.parseInt(
                $(element)
                    .find("[href$='/stargazers']")
                    .text()
                    .trim()
                    .replace(/,/g, ""),
                10
            );

            items.push(
                this.buildItem({
                    url: `https://github.com${repoPath}`,
                    title: `${repoPath.slice(1)}${language ? ` (${language})` : ""}`,
                    summary: this.toSummary($(element).find("p").text()),
                    engagement: Number.isNaN(stars) ? undefined : stars,
                    contentType: "repo",
                    tags: ["github", language].filter(Boolean) as string[],
                })
            );

            return undefined;
        });

        return items;
    }
}
