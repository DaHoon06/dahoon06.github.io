const cachedPosts = require("../posts/cachedPosts.json");
const cachedArchiving = require("../posts/cachedArchiving.json");
const { CONFIG } = require("../site.config");

const toIso = (value) => {
    if (!value) return undefined;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

/** 글의 실제 수정 시각 — 빌드 시각을 lastmod 로 쓰면 검색엔진이 lastmod 를 신뢰하지 않게 된다 */
const articleLastmod = new Map(
    [
        ...cachedPosts.map((post) => [`/posts/${post.slug}`, post]),
        ...cachedArchiving.map((post) => [`/archiving/${post.slug}`, post]),
    ].map(([path, post]) => [
        path,
        toIso(post.lastEditedTime) ||
            toIso(post.date?.start_date) ||
            toIso(post.createdTime),
    ])
);

/** 경로별 우선순위·갱신 주기. 위에서부터 첫 매칭 */
const RULES = [
    { test: (p) => p === "/", priority: 1.0, changefreq: "daily" },
    {
        test: (p) => p === "/posts" || p === "/archiving",
        priority: 0.9,
        changefreq: "daily",
    },
    {
        test: (p) => p.startsWith("/posts/") || p.startsWith("/archiving/"),
        priority: 0.8,
        changefreq: "weekly",
    },
    { test: (p) => p === "/tools", priority: 0.8, changefreq: "monthly" },
    { test: (p) => p.startsWith("/tools/"), priority: 0.8, changefreq: "monthly" },
    { test: (p) => p === "/about-me", priority: 0.7, changefreq: "monthly" },
    { test: (p) => p === "/news", priority: 0.6, changefreq: "daily" },
    { test: (p) => p.startsWith("/news/"), priority: 0.4, changefreq: "never" },
];

/**
 * 빌드 산출물(out/)에 직접 쓴다. CI 는 `npm run build` 로 postbuild 까지 돌려
 * 배포마다 최신 글·뉴스가 사이트맵에 반영되게 한다.
 * (예전처럼 public/ 에 쓰면 이번 빌드 결과가 다음 빌드에야 배포된다.)
 *
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
    siteUrl: CONFIG.domain,
    outDir: "./out",
    generateRobotsTxt: true,
    sitemapSize: 20000,
    exclude: ["/api/*", "/404", "/500"],
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/", disallow: ["/api/"] },
        ],
    },
    transform: async (config, path) => {
        const rule = RULES.find((r) => r.test(path));

        let lastmod = articleLastmod.get(path);
        if (!lastmod && path.startsWith("/news/")) {
            lastmod = toIso(`${path.slice("/news/".length)}T07:00:00+09:00`);
        }

        return {
            loc: path,
            changefreq: rule?.changefreq ?? "weekly",
            priority: rule?.priority ?? 0.5,
            lastmod: lastmod ?? new Date().toISOString(),
        };
    },
};
