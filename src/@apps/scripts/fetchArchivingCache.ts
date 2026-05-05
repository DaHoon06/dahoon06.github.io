import fs from "fs";
import path from "path";
import "dotenv/config";

import { getArchiving } from "@entities/notion";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

(async () => {
    console.log("⚡ Fetching archiving from Notion...");
    const archiving = await getArchiving();

    fs.writeFileSync(
        path.join(process.cwd(), "posts/cachedArchiving.json"),
        JSON.stringify(archiving, null, 2)
    );

    console.log("Archiving cached to /posts/cachedArchiving.json");
})();
