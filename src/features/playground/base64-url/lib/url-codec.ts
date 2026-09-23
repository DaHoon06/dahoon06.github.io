import type { ParsedUrl, UrlEncodeScope } from "../model/types";

export function encodeUrl(text: string, scope: UrlEncodeScope): string {
    return scope === "component" ? encodeURIComponent(text) : encodeURI(text);
}

/**
 * `+`는 폼 인코딩(application/x-www-form-urlencoded)에서 공백이라,
 * 쿼리스트링을 붙여 넣는 경우를 위해 옵션으로 공백 처리한다.
 */
export function decodeUrl(text: string, plusAsSpace: boolean): string {
    const source = plusAsSpace ? text.replace(/\+/g, " ") : text;
    try {
        return decodeURIComponent(source);
    } catch {
        throw new Error(
            "잘못된 퍼센트 인코딩이 있어요. `%` 뒤에는 16진수 두 자리가 와야 해요."
        );
    }
}

/**
 * 절대 URL이면 origin·path·hash까지, 아니면 `a=1&b=2` 형태의 쿼리스트링으로 보고 파싱한다.
 * 같은 키가 여러 번 나오면(`tag=a&tag=b`) 순서대로 모두 남긴다.
 */
export function parseUrl(input: string): ParsedUrl | null {
    const text = input.trim();
    if (!text) return null;

    try {
        const url = new URL(text);
        return {
            origin: url.origin === "null" ? url.protocol : url.origin,
            pathname: url.pathname,
            hash: url.hash || null,
            params: [...url.searchParams].map(([key, value]) => ({
                key,
                value,
            })),
        };
    } catch {
        // 절대 URL이 아님 — 쿼리스트링으로 시도
    }

    const query = text.slice(text.indexOf("?") + 1);
    if (!query.includes("=")) return null;

    return {
        origin: null,
        pathname: null,
        hash: null,
        params: [...new URLSearchParams(query)].map(([key, value]) => ({
            key,
            value,
        })),
    };
}
