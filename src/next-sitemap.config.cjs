const fs = require("fs");
const path = require("path");
const cachedPosts = require("../posts/cachedPosts.json");
const { CONFIG } = require("../site.config");

/** data/news/YYYY-MM-DD.json — 수집 워크플로가 커밋하는 뉴스 아카이브 */
const readNewsDates = () => {
    const dir = path.join(__dirname, "..", "data", "news");
    if (!fs.existsSync(dir)) return [];

    return fs
        .readdirSync(dir)
        .filter((file) => /^\d{4}-\d{2}-\d{2}\.json$/.test(file))
        .map((file) => file.replace(/\.json$/, ""))
        .sort((a, b) => b.localeCompare(a));
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: CONFIG.domain,
    generateRobotsTxt: true,
    sitemapSize: 20000,
    changefreq: "daily",
    outDir: "./public",
    priority: 1,
    exclude: ["/api/**"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/**"],
            },
        ],
    },
    additionalPaths: async (config) => {
        const sitemap = [];
        console.log("⚡ Generating sitemap for posts...");
        cachedPosts.forEach((post) => {
            sitemap.push({
                loc: `${CONFIG.domain}/posts/${post.slug}`,
                lastmod: new Date(post.createdTime).toISOString(),
                changefreq: "weekly",
                priority: 0.8,
            });
        });

        const newsDates = readNewsDates();
        console.log(`⚡ Generating sitemap for news... (${newsDates.length}일)`);
        newsDates.forEach((date) => {
            sitemap.push({
                loc: `${CONFIG.domain}/news/${date}`,
                lastmod: new Date(`${date}T00:00:00+09:00`).toISOString(),
                changefreq: "never",
                priority: 0.5,
            });
        });

        return sitemap;
    },
};
