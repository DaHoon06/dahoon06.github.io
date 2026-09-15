import { createNotionClient } from "./notion-api-client";
import { getPageWithDelay } from "./get-page-with-retry";

export const getRecordMap = async (pageId: string) => {
    const api = createNotionClient();
    const recordMap = await getPageWithDelay(api, pageId);
    return recordMap;
};
