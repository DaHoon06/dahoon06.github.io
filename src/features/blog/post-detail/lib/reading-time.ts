import { ExtendedRecordMap } from "notion-types";

/** 한국어 기술 글 기준 분당 읽는 글자 수(공백 제외) */
const CHARS_PER_MINUTE = 500;

/** 코드는 한 글자씩 읽지 않고 훑어보므로 글자 수의 1/3만 센다 */
const CODE_WEIGHT = 1 / 3;

/** 글 본문이 아닌 블록 — 페이지·DB 블록의 properties는 제목·태그 같은 메타데이터다 */
const SKIP_TYPES = new Set(["page", "collection_view_page", "collection_view"]);

/** recordMap.block 항목은 버전에 따라 { value } 또는 { value: { value } }로 온다 */
const unwrapBlock = (entry: any) => {
    const value = entry?.value;
    return value && !value.type && value.value ? value.value : value;
};

/** Notion 리치 텍스트([["텍스트", 서식[]], ...])에서 글자만 뽑는다 */
const decorationText = (decoration: unknown): string =>
    Array.isArray(decoration)
        ? decoration
              .map((segment) =>
                  Array.isArray(segment) && typeof segment[0] === "string"
                      ? segment[0]
                      : ""
              )
              .join("")
        : "";

/** 본문 글자 수로 "약 N분 읽기"의 N을 구한다. 최소 1분. */
export const getReadingMinutes = (recordMap?: ExtendedRecordMap): number => {
    if (!recordMap?.block) return 1;

    let chars = 0;
    for (const entry of Object.values(recordMap.block)) {
        const block = unwrapBlock(entry);
        if (!block?.properties || SKIP_TYPES.has(block.type)) continue;

        if (block.type === "code") {
            chars +=
                decorationText(block.properties.title).replace(/\s/g, "")
                    .length * CODE_WEIGHT;
            continue;
        }

        // 표 행은 열 id마다 텍스트가 따로 있어서 title만 보지 않고 전부 센다
        for (const value of Object.values(block.properties)) {
            chars += decorationText(value).replace(/\s/g, "").length;
        }
    }

    return Math.max(1, Math.round(chars / CHARS_PER_MINUTE));
};
