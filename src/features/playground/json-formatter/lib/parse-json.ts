import { findJsonErrorOffset } from "./find-json-error";
import type {
    JsonParseError,
    JsonParseResult,
    JsonValue,
} from "../model/types";

/** 문자열 offset(0-based) → 1-based line/column */
export function offsetToLineColumn(
    source: string,
    offset: number
): { line: number; column: number } {
    const before = source.slice(0, Math.max(0, offset));
    const lines = before.split("\n");
    return { line: lines.length, column: (lines.at(-1) ?? "").length + 1 };
}

/**
 * 브라우저마다 JSON.parse 에러 메시지 형식이 달라서 위치를 뽑는 방법도 제각각이다.
 * - V8(신): `... in JSON at position 10 (line 1 column 11)`
 * - V8(구): `Unexpected token } in JSON at position 10`
 * - Firefox: `JSON.parse: ... at line 1 column 11 of the JSON data`
 * - V8(Chrome 117+, Node 20+) · Safari: 위치 정보 없음 → 자체 스캐너로 찾는다
 */
export function locateJsonError(
    source: string,
    message: string
): Pick<JsonParseError, "line" | "column"> {
    const lineCol = message.match(/line (\d+) column (\d+)/);
    if (lineCol) {
        return { line: Number(lineCol[1]), column: Number(lineCol[2]) };
    }

    const position = message.match(/position (\d+)/);
    if (position) return offsetToLineColumn(source, Number(position[1]));

    const offset = findJsonErrorOffset(source);
    if (offset !== null) return offsetToLineColumn(source, offset);

    return { line: null, column: null };
}

export function parseJson(source: string): JsonParseResult {
    try {
        return { ok: true, value: JSON.parse(source) as JsonValue };
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return {
            ok: false,
            error: { message, ...locateJsonError(source, message) },
        };
    }
}
