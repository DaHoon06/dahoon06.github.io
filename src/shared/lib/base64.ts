/**
 * UTF-8 안전한 Base64 유틸.
 * `btoa`/`atob`는 Latin-1 문자열만 받아서 한글을 넣으면 예외가 난다 — 바이트 배열을 거쳐 변환한다.
 */

export interface Base64EncodeOptions {
    /** `+` `/` 대신 `-` `_` (RFC 4648 §5, JWT가 쓰는 형식) */
    urlSafe?: boolean;
    /** 끝의 `=` 패딩 유지 */
    padding?: boolean;
}

export function bytesToBase64(
    bytes: Uint8Array,
    { urlSafe = false, padding = true }: Base64EncodeOptions = {}
): string {
    let binary = "";
    // 큰 배열을 apply로 한 번에 넘기면 콜스택 한도를 넘는다
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
        binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    }

    let base64 = btoa(binary);
    if (urlSafe) base64 = base64.replace(/\+/g, "-").replace(/\//g, "_");
    if (!padding) base64 = base64.replace(/=+$/, "");
    return base64;
}

/** 표준·URL-safe 둘 다 받고, 공백·줄바꿈·누락된 패딩은 관대하게 처리한다. */
export function base64ToBytes(input: string): Uint8Array {
    const normalized = input
        .replace(/\s+/g, "")
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .replace(/=+$/, "");

    if (!/^[A-Za-z0-9+/]*$/.test(normalized) || normalized.length % 4 === 1) {
        throw new Error("올바른 Base64 문자열이 아니에요.");
    }

    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

export function encodeBase64(
    text: string,
    options?: Base64EncodeOptions
): string {
    return bytesToBase64(new TextEncoder().encode(text), options);
}

/** 디코딩 결과가 UTF-8 텍스트가 아니면(바이너리) 예외를 던진다. */
export function decodeBase64(input: string): string {
    const bytes = base64ToBytes(input);
    try {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
        throw new Error(
            "디코딩은 됐지만 UTF-8 텍스트가 아니에요. 이미지 같은 바이너리 데이터일 수 있어요."
        );
    }
}
