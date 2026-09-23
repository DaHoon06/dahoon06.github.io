import { CONFIG } from "@root/site.config";

/**
 * 사이트 전역 SEO 상수와 정적 페이지별 메타.
 *
 * - description 은 네이버 진단 기준(80자 이내)에 맞춘다. 구글도 모바일에서 한글 80자 안팎만 노출한다.
 * - title 은 페이지 고유 키워드를 앞에 두고, 사이트명은 SeoHead 가 뒤에 붙인다.
 * - 페이지를 추가하면 여기 PAGE_SEO 에 항목을 더하고 페이지에서 <SeoHead {...PAGE_SEO.xxx} /> 로 쓴다.
 */
export const SITE = {
    url: CONFIG.domain,
    name: "전다훈 개발 블로그",
    /** title 뒤에 붙는 브랜드 */
    titleSuffix: "전다훈 블로그",
    author: "전다훈 (Da-hoon Jeon)",
    locale: "ko_KR",
    defaultImage: "/images/default.png",
    defaultImageWidth: 1536,
    defaultImageHeight: 1024,
    sameAs: [
        "https://github.com/dahoon06",
        `https://www.linkedin.com/in/${encodeURIComponent(CONFIG.profile.linkedin)}`,
    ],
} as const;

/** 모든 페이지 keywords 뒤에 붙는 브랜드 키워드 */
export const BRAND_KEYWORDS = ["전다훈", "Dahoon06"];

export type PageSeo = {
    title: string;
    description: string;
    path: string;
    keywords: string[];
};

export const PAGE_SEO = {
    home: {
        title: "전다훈(Dahoon06) | 프론트엔드 개발자 기술 블로그",
        description:
            "프론트엔드 개발자 전다훈의 기술 블로그. 실무 아카이빙, 개발·일상 글, 매일 개발 뉴스, 개발 도구를 한곳에 모았습니다.",
        path: "/",
        keywords: [
            "개발 블로그",
            "기술 블로그",
            "프론트엔드 개발자",
            "Next.js",
            "React",
            "NestJS",
        ],
    },
    posts: {
        title: "블로그 — 개발 경험과 일상 기록",
        description:
            "Next.js·React·NestJS 개발 경험과 트러블슈팅, 회고, 개발자의 일상을 기록한 전다훈의 블로그 글 목록입니다.",
        path: "/posts",
        keywords: [
            "개발 블로그",
            "트러블슈팅",
            "회고",
            "개발자 일상",
            "Next.js",
            "React",
        ],
    },
    archiving: {
        title: "아카이빙 — 실무 개발 문제 해결 기록",
        description:
            "실무에서 마주한 문제의 원인 분석, 설계 결정, 해결 과정을 정리한 업무 아카이빙입니다. 프론트엔드·백엔드 실전 기록.",
        path: "/archiving",
        keywords: [
            "실무 기록",
            "업무 아카이빙",
            "문제 해결",
            "설계",
            "프론트엔드",
            "백엔드",
        ],
    },
    news: {
        title: "개발 뉴스 — 매일 아침 모아보는 기술 소식",
        description:
            "Hacker News·GitHub Trending·기술 블로그 RSS에서 매일 아침 자동 수집한 개발 뉴스를 날짜별로 모았습니다.",
        path: "/news",
        keywords: [
            "개발 뉴스",
            "IT 뉴스",
            "기술 트렌드",
            "Hacker News",
            "GitHub Trending",
        ],
    },
    about: {
        title: "About Me — 프론트엔드 개발자 전다훈 포트폴리오",
        description:
            "Next.js·React·NestJS로 서비스를 만드는 프론트엔드 개발자 전다훈의 경력, 프로젝트, 기술 스택을 소개합니다.",
        path: "/about-me",
        keywords: [
            "포트폴리오",
            "프론트엔드 개발자",
            "개발자 이력서",
            "경력",
            "프로젝트",
        ],
    },
} satisfies Record<string, PageSeo>;

/** 상대 경로·이미지를 절대 URL 로 — og:image, canonical 은 절대 URL 이어야 한다 */
export const toAbsoluteUrl = (pathOrUrl: string): string => {
    if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
    const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return path === "/" ? SITE.url : `${SITE.url}${path}`;
};

/** 네이버 진단 기준 80자 — 넘으면 말줄임 */
export const clampDescription = (text: string, max = 80): string => {
    const normalized = text.replace(/\s+/g, " ").trim();
    if (normalized.length <= max) return normalized;
    return `${normalized.slice(0, max - 1).trimEnd()}…`;
};

export const personJsonLd = {
    "@type": "Person",
    name: "전다훈",
    alternateName: ["Da-hoon Jeon", "Dahoon06"],
    url: `${SITE.url}/about-me`,
    image: toAbsoluteUrl(CONFIG.profile.image),
    jobTitle: "Frontend Engineer",
    sameAs: SITE.sameAs,
};

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: toAbsoluteUrl(item.path),
    })),
});
