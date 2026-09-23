export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

/** 들여쓰기 옵션. `"tab"`은 탭 문자 하나. */
export type JsonIndent = 2 | 4 | "tab";

export const JSON_INDENT_OPTIONS: { value: JsonIndent; label: string }[] = [
    { value: 2, label: "2칸" },
    { value: 4, label: "4칸" },
    { value: "tab", label: "탭" },
];

export interface JsonParseError {
    message: string;
    /** 1부터 시작. 위치를 알 수 없으면 null */
    line: number | null;
    column: number | null;
}

export type JsonParseResult =
    | { ok: true; value: JsonValue }
    | { ok: false; error: JsonParseError };

export type JsonViewMode = "text" | "tree";
