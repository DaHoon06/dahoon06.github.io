import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";
import getAllPageIds from "./getAllPageIds";
import getPageProperties from "./getPageProperties";
import { PostsType } from "../types";
import { CONFIG } from "@root/site.config";

export const getPosts = async () => {
    let id =
        CONFIG.notionConfig.pageId ||
        (process.env.NEXT_PUBLIC_NOTION_PAGE_ID as string);
    const api = new NotionAPI();

    const response = await api.getPage(id);
    id = idToUuid(id);
    const collection = Object.values(response.collection)[0]?.value;
    const block = response.block;
    const schema = collection?.schema;

    const rawMetadata = block[id].value;

    // Check Type
    if (
        rawMetadata?.type !== "collection_view_page" &&
        rawMetadata?.type !== "collection_view"
    ) {
        return [];
    } else {
        // Construct Data
        const pageIds = getAllPageIds(response);
        const data = [];
        for (let i = 0; i < pageIds.length; i++) {
            const id = pageIds[i];
            const properties =
                (await getPageProperties(id, block, schema)) || null;
            // Add fullwidth, createdtime to properties
            properties.createdTime = new Date(
                block[id].value?.created_time
            ).toString();
            properties.fullWidth =
                (block[id].value?.format as any)?.page_full_width ?? false;

            data.push(properties);
        }

        // Sort by date
        data.sort((a: any, b: any) => {
            const dateA: any = new Date(a?.date?.start_date || a.createdTime);
            const dateB: any = new Date(b?.date?.start_date || b.createdTime);
            return dateB - dateA;
        });

        const posts = data as PostsType;
        return posts;
    }
};
