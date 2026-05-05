import fs from "fs";
import path from "path";
import "dotenv/config";

import { getPosts } from "@entities/notion";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

(async () => {
    console.log("⚡ Fetching posts from Notion...");
    const posts = await getPosts();

    fs.writeFileSync(
        path.join(process.cwd(), "posts/cachedPosts.json"),
        JSON.stringify(posts, null, 2)
    );

    console.log("Posts cached to /posts/cachedPosts.json");
})();
