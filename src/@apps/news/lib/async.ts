/** 의존성 없이 쓰는 최소 동시성·재시도 헬퍼 */

export const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export async function mapWithConcurrency<T, R>(
    items: T[],
    limit: number,
    worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
    const results = new Array<R>(items.length);
    let cursor = 0;

    const runners = Array.from({ length: Math.min(limit, items.length) }, () =>
        (async () => {
            while (cursor < items.length) {
                const index = cursor++;
                const item = items[index] as T;
                results[index] = await worker(item, index);
            }
        })()
    );

    await Promise.all(runners);
    return results;
}

export async function withRetry<T>(
    fn: () => Promise<T>,
    label: string,
    maxAttempts = 2
): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt < maxAttempts) {
                await delay(1000 * attempt);
            }
        }
    }

    throw lastError instanceof Error ? lastError : new Error(`${label} 실패`);
}
