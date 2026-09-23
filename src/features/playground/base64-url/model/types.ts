export type CodecTab = "base64" | "url";
export type CodecDirection = "encode" | "decode";

/**
 * - `component`: encodeURIComponent — 쿼리 값 하나를 넣을 때. `/ ? & =`까지 인코딩
 * - `uri`: encodeURI — URL 전체. 구조 문자(`/ ? & = #`)는 그대로 둔다
 */
export type UrlEncodeScope = "component" | "uri";

export interface QueryParam {
    key: string;
    value: string;
}

export interface ParsedUrl {
    /** 절대 URL이 아니면(쿼리스트링만 넣은 경우) null */
    origin: string | null;
    pathname: string | null;
    hash: string | null;
    params: QueryParam[];
}

/** data URI로 바꿀 파일 크기 상한. 결과 문자열이 약 1.33배로 불어난다 */
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
