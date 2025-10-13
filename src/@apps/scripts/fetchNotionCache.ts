import fs from "fs";
import path from "path";
import "dotenv/config";

import { getPosts } from "@entities/notion/libs/getPosts";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

(async () => {
    console.log("Fetching posts from Notion...");
    const posts = await getPosts();
    const dataDir = path.join(process.cwd(), "public");
    const sitemapPath = path.join(dataDir, "sitemap.xml");

    fs.writeFileSync(
        path.join(process.cwd(), "posts/cachedPosts.json"),
        JSON.stringify(posts, null, 2)
    );

    console.log("Posts cached to /posts/cachedPosts.json");

    const baseUrl = "https://dahoon06.github.io";

    const sitemapItems = posts
        .map((post) => {
            const url = `${baseUrl}/posts/${post.slug}`;
            return `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date(post.createdTime).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
        })
        .join("\n");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapItems}
  </urlset>`;

    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Generated sitemap.xml → ${sitemapPath}`);
})();
