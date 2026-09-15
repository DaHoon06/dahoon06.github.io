import type { NewsGroupId, NewsItem } from "../model/news.types";

interface GroupMeta {
    id: NewsGroupId;
    label: string;
    /** 필터 칩 등에 쓰는 짧은 설명 */
    description: string;
}

/** 표시 순서를 겸한다 */
export const NEWS_GROUPS: GroupMeta[] = [
    {
        id: "framework",
        label: "프레임워크",
        description: "React · Next.js · TypeScript 등 공식 블로그",
    },
    {
        id: "korean",
        label: "국내 기술블로그",
        description: "토스 · 우아한형제들 · 카카오 등",
    },
    {
        id: "community",
        label: "커뮤니티",
        description: "Hacker News · GeekNews · GitHub Trending",
    },
    {
        id: "newsletter",
        label: "뉴스레터",
        description: "JavaScript Weekly · Smashing 등",
    },
];

const GROUP_LABEL = new Map(NEWS_GROUPS.map((g) => [g.id, g.label]));

export const getGroupLabel = (id: NewsGroupId): string =>
    GROUP_LABEL.get(id) ?? id;

/** `2026-09-15` → `2026년 9월 15일 (월)` */
export const formatArchiveDate = (date: string): string => {
    const parsed = new Date(`${date}T00:00:00+09:00`);
    if (Number.isNaN(parsed.getTime())) return date;

    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
        timeZone: "Asia/Seoul",
    }).format(parsed);
};

/** 발행 시각을 "3시간 전" 형태로. 7일이 넘으면 날짜로 떨어뜨린다 */
export const formatPublishedAt = (
    iso: string,
    now: Date = new Date()
): string => {
    const published = new Date(iso);
    if (Number.isNaN(published.getTime())) return "";

    const diffMinutes = Math.floor(
        (now.getTime() - published.getTime()) / (1000 * 60)
    );

    if (diffMinutes < 1) return "방금 전";
    if (diffMinutes < 60) return `${diffMinutes}분 전`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays <= 7) return `${diffDays}일 전`;

    return new Intl.DateTimeFormat("ko-KR", {
        month: "long",
        day: "numeric",
        timeZone: "Asia/Seoul",
    }).format(published);
};

/** 링크 옆에 보여줄 도메인 (`https://react.dev/blog/x` → `react.dev`) */
export const getHostname = (url: string): string => {
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return "";
    }
};

/** HN 포인트 / GitHub 스타 배지 문구 */
export const formatEngagement = (item: NewsItem): string | null => {
    if (!item.engagement) return null;
    if (item.contentType === "repo")
        return `★ ${item.engagement.toLocaleString()}`;
    return `▲ ${item.engagement.toLocaleString()}`;
};
