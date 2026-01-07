import fs from "fs";
import path from "path";
import "dotenv/config";

import { getDairy } from "@entities/notion/libs/getDairy";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

(async () => {
    console.log("⚡ Fetching dairy from Notion...");
    const dairy = await getDairy();

    fs.writeFileSync(
        path.join(process.cwd(), "posts/cachedDairy.json"),
        JSON.stringify(dairy, null, 2)
    );

    console.log("Dairy cached to /posts/cachedDairy.json");
})();
