import { NotionAPI } from "notion-client";
import { getPageWithDelay } from "./get-page-with-retry";

export const getRecordMap = async (pageId: string) => {
    const api = new NotionAPI();
    const recordMap = await getPageWithDelay(api, pageId);
    return recordMap;
};
