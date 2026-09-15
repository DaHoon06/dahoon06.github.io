import { getSourceById } from "../config/sources";
import type { CollectedItem } from "../collectors/types";

/**
 * AI 없이 정렬 순서를 정하는 규칙 기반 점수.
 *
 *   소스 가중치(0-30) + 참여도(0-30) + 최신성(0-20) + 키워드(0-20)
 *
 * 절대값에 의미가 있는 수치가 아니라 **하루치 안에서의 상대 순위**를 만드는 용도다.
 */
export const calculateScore = (
    item: CollectedItem,
    now: Date = new Date()
): number => {
    const weight = getSourceById(item.sourceId)?.weight ?? 5;

    let score = weight * 3;
    score += engagementScore(item);
    score += recencyScore(item, now);
    score += keywordScore(item.title);

    return Math.round(score);
};

const engagementScore = (item: CollectedItem): number => {
    const engagement = item.engagement ?? 0;
    if (!engagement) return 0;

    if (item.contentType === "repo") {
        if (engagement >= 20_000) return 30;
        if (engagement >= 5_000) return 22;
        if (engagement >= 1_000) return 14;
        return 6;
    }

    if (engagement >= 300) return 30;
    if (engagement >= 150) return 22;
    if (engagement >= 80) return 14;
    return 6;
};

const recencyScore = (item: CollectedItem, now: Date): number => {
    const hours =
        (now.getTime() - new Date(item.publishedAt).getTime()) / 3_600_000;

    if (hours <= 12) return 20;
    if (hours <= 24) return 16;
    if (hours <= 48) return 10;
    if (hours <= 96) return 5;
    return 0;
};

/** 이 블로그가 다루는 주제와 가까울수록 위로 */
const KEYWORDS = [
    "react",
    "next.js",
    "nextjs",
    "typescript",
    "javascript",
    "css",
    "tailwind",
    "vue",
    "svelte",
    "astro",
    "node",
    "nest",
    "mongodb",
    "prisma",
    "frontend",
    "front-end",
    "프론트엔드",
    "백엔드",
    "component",
    "hook",
    "ssr",
    "rsc",
    "server component",
    "vite",
    "webpack",
    "turbopack",
    "bundle",
    "performance",
    "web vitals",
    "accessibility",
    "렌더링",
    "성능",
];

const keywordScore = (title: string): number => {
    const lower = title.toLowerCase();
    const hits = KEYWORDS.filter((keyword) => lower.includes(keyword)).length;
    return Math.min(hits * 4, 20);
};
