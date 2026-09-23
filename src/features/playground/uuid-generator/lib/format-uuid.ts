import type { UuidFormatOptions } from "../model/types";

/** 생성된 UUID 문자열을 표기 옵션에 맞춰 다듬는다. */
export const formatUuid = (
    uuid: string,
    { uppercase, hyphens, braces }: UuidFormatOptions
): string => {
    let output = hyphens ? uuid : uuid.replace(/-/g, "");
    if (uppercase) output = output.toUpperCase();
    if (braces) output = `{${output}}`;
    return output;
};

/** 옵션 조합이 어떤 모양인지 미리 보여 주기 위한 샘플. */
export const FORMAT_SAMPLE_UUID = "0f9c2b5a-7d3e-4a1b-9c6d-2e8f4b1a7c30";
