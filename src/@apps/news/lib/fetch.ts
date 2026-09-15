/**
 * 전역 fetch 는 기본 타임아웃이 없다 — 소스 하나가 응답하지 않으면
 * GitHub Actions 잡이 통째로 멈춘다. 모든 수집은 이 래퍼를 쓴다.
 */
const DEFAULT_TIMEOUT_MS = 12_000;

export const fetchWithTimeout = async (
    url: string,
    init: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> => {
    const { timeoutMs = DEFAULT_TIMEOUT_MS, ...rest } = init;

    return fetch(url, {
        ...rest,
        headers: { "User-Agent": "dahoon06-news/1.0", ...rest.headers },
        signal: AbortSignal.timeout(timeoutMs),
    });
};
