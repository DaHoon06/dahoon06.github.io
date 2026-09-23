/**
 * 빌드 후 out/rss.xml 생성 — 네이버 서치어드바이저·구글에 RSS 로 제출해 새 글 수집을 앞당긴다.
 * 블로그 글과 아카이빙을 최신순으로 합친다. (postbuild 에서 next-sitemap 다음에 실행)
 */
const fs = require("fs");
const path = require("path");
const cachedPosts = require("../../../posts/cachedPosts.json");
const cachedArchiving = require("../../../posts/cachedArchiving.json");
const { CONFIG } = require("../../../site.config");

const OUT_FILE = path.join(__dirname, "..", "..", "..", "out", "rss.xml");
const LIMIT = 50;

const escapeXml = (value = "") =>
    `${value}`
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

const toDate = (post) => {
    const parsed = new Date(post.date?.start_date || post.createdTime);
    return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

const isPublic = (post) =>
    (post.status ?? []).includes("Public") &&
    (post.type ?? []).some((type) => type === "Post" || type === "Paper");

const items = [
    ...cachedPosts
        .filter(isPublic)
        .map((post) => ({ post, url: `${CONFIG.domain}/posts/${post.slug}` })),
    ...cachedArchiving.map((post) => ({
        post,
        url: `${CONFIG.domain}/archiving/${post.slug}`,
    })),
]
    .sort((a, b) => toDate(b.post) - toDate(a.post))
    .slice(0, LIMIT);

const itemXml = items
    .map(({ post, url }) => {
        const categories = [...(post.category ?? []), ...(post.tags ?? [])]
            .map((c) => `<category>${escapeXml(c)}</category>`)
            .join("");

        return [
            "<item>",
            `<title>${escapeXml(post.title)}</title>`,
            `<link>${url}</link>`,
            `<guid isPermaLink="true">${url}</guid>`,
            `<description>${escapeXml(post.summary || post.title)}</description>`,
            `<pubDate>${toDate(post).toUTCString()}</pubDate>`,
            categories,
            "</item>",
        ].join("");
    })
    .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>전다훈 개발 블로그</title>
<link>${CONFIG.domain}</link>
<description>프론트엔드 개발자 전다훈의 실무 아카이빙과 개발·일상 블로그</description>
<language>ko</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<atom:link href="${CONFIG.domain}/rss.xml" rel="self" type="application/rss+xml"/>
${itemXml}
</channel>
</rss>
`;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, xml);
console.log(`⚡ rss.xml 생성 (${items.length}건)`);
