import fs from "fs";
import path from "path";

import { getPosts } from "@entities/notion/libs/getPosts";

(async () => {
    console.log("Fetching posts from Notion...");
    const posts = await getPosts();
    fs.writeFileSync(
        path.join(process.cwd(), "posts/cachedPosts.json"),
        JSON.stringify(posts, null, 2)
    );
    console.log("✅ Posts cached to /posts/cachedPosts.json");
})();
