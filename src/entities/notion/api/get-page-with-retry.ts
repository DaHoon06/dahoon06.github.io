import { NotionAPI } from "notion-client";

/**
 * Notion 비공식 API는 짧은 시간에 요청이 몰리면 429(Too Many Requests)를 던진다.
 * 요청 사이 최소 간격을 두고, 429/5xx가 오면 지수 백오프로 재시도한다.
 */
const NOTION_REQUEST_DELAY_MS = 600;
const MAX_RETRIES = 5;
const BASE_BACKOFF_MS = 2_000;

let lastRequestAt = 0;

const wait = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const waitForRequestSlot = async () => {
    const remaining = NOTION_REQUEST_DELAY_MS - (Date.now() - lastRequestAt);
    if (remaining > 0) await wait(remaining);
    lastRequestAt = Date.now();
};

const isRetryable = (error: any) => {
    const status =
        error?.status ?? error?.statusCode ?? error?.response?.status;
    return status === 429 || (typeof status === "number" && status >= 500);
};

const withRetry = async <T>(
    label: string,
    run: () => Promise<T>
): Promise<T> => {
    for (let attempt = 0; ; attempt++) {
        await waitForRequestSlot();
        try {
            return await run();
        } catch (error: any) {
            if (attempt >= MAX_RETRIES || !isRetryable(error)) throw error;

            const backoff = BASE_BACKOFF_MS * 2 ** attempt;
            console.warn(
                `[notion] ${label} 재시도 ${attempt + 1}/${MAX_RETRIES} — ${backoff}ms 대기 (${error?.status ?? "?"})`
            );
            await wait(backoff);
        }
    }
};

export const getPageWithDelay = async (api: NotionAPI, pageId: string) =>
    withRetry(`getPage(${pageId})`, () => api.getPage(pageId));

export const getUsersWithDelay = async (api: NotionAPI, userId: string[]) =>
    withRetry(`getUsers`, () => api.getUsers(userId));
