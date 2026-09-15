import { fetchWithTimeout } from "../lib/fetch";
import { BaseCollector } from "./base-collector";
import type { CollectedItem } from "./types";

const HN_API = "https://hacker-news.firebaseio.com/v0";
const TOP_COUNT = 30;
/** 이 점수 아래는 아직 검증되지 않은 글로 본다 */
const MIN_SCORE = 50;

interface HNStory {
    id: number;
    title: string;
    url?: string;
    score: number;
    time: number;
    by: string;
    descendants?: number;
}

export class HackernewsCollector extends BaseCollector {
    protected async fetchItems(): Promise<CollectedItem[]> {
        const res = await fetchWithTimeout(`${HN_API}/topstories.json`);
        if (!res.ok) throw new Error(`HN topstories ${res.status}`);

        const ids = (await res.json()) as number[];
        const stories = await Promise.all(
            ids.slice(0, TOP_COUNT).map((id) => this.fetchStory(id))
        );

        return stories
            .filter(
                (story): story is HNStory =>
                    story !== null && !!story.url && story.score >= MIN_SCORE
            )
            .map((story) =>
                this.buildItem({
                    url: story.url as string,
                    title: story.title,
                    summary: `Hacker News 토론 ${story.descendants ?? 0}개 · ${story.score} points`,
                    publishedAt: new Date(story.time * 1000).toISOString(),
                    engagement: story.score,
                    contentType: "discussion",
                    tags: ["hackernews"],
                })
            );
    }

    private async fetchStory(id: number): Promise<HNStory | null> {
        try {
            const res = await fetchWithTimeout(`${HN_API}/item/${id}.json`);
            return (await res.json()) as HNStory;
        } catch {
            return null;
        }
    }
}
