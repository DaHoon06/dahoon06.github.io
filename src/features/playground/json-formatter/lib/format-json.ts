import type { JsonIndent, JsonValue } from "../model/types";

function isPlainObject(
    value: JsonValue
): value is { [key: string]: JsonValue } {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** 객체 키를 재귀적으로 사전순 정렬한다. 배열 순서는 건드리지 않는다. */
export function sortJsonKeys(value: JsonValue): JsonValue {
    if (Array.isArray(value)) return value.map(sortJsonKeys);
    if (!isPlainObject(value)) return value;

    return Object.fromEntries(
        Object.entries(value)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .map(([key, child]) => [key, sortJsonKeys(child)])
    );
}

export function formatJson(
    value: JsonValue,
    indent: JsonIndent,
    sortKeys = false
): string {
    const target = sortKeys ? sortJsonKeys(value) : value;
    return JSON.stringify(target, null, indent === "tab" ? "\t" : indent);
}

export function minifyJson(value: JsonValue, sortKeys = false): string {
    return JSON.stringify(sortKeys ? sortJsonKeys(value) : value);
}

/** UTF-8 기준 바이트 수 */
export function byteLength(text: string): number {
    return new TextEncoder().encode(text).length;
}

export function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
