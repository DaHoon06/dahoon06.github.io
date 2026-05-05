import { NotionAPI } from "notion-client";

const NOTION_REQUEST_DELAY_MS = 350;
let lastRequestAt = 0;

const wait = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const waitForRequestSlot = async () => {
    const now = Date.now();
    const elapsed = now - lastRequestAt;
    const remaining = NOTION_REQUEST_DELAY_MS - elapsed;

    if (remaining > 0) {
        await wait(remaining);
    }

    lastRequestAt = Date.now();
};

export const getPageWithDelay = async (api: NotionAPI, pageId: string) => {
    await waitForRequestSlot();
    return api.getPage(pageId);
};

export const getUsersWithDelay = async (api: NotionAPI, userId: string[]) => {
    await waitForRequestSlot();
    return api.getUsers(userId);
};
