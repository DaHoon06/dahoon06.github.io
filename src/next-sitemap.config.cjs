const cachedPosts = require("../posts/cachedPosts.json");
const { CONFIG } = require("../site.config");

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

        return sitemap;
    },
};
