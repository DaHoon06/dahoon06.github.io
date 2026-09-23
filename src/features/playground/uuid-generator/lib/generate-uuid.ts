import { v1, v3, v4, v5, validate } from "uuid";
import { MAX_UUID_COUNT, type UuidVersion } from "../model/types";

/** 바이트 → 하이픈 포함 UUID 문자열. */
const BYTE_TO_HEX = Array.from({ length: 256 }, (_, i) =>
    (i + 0x100).toString(16).slice(1)
);

/**
 * `uuid` 패키지의 `stringify`는 내부적으로 v1~v5만 통과시키는 검증을 하기 때문에
 * v7 바이트를 넣으면 예외를 던진다. 그래서 문자열 변환은 직접 한다.
 */
const stringifyBytes = (bytes: Uint8Array): string => {
    const hex = (index: number) => BYTE_TO_HEX[bytes[index] ?? 0];

    return (
        `${hex(0)}${hex(1)}${hex(2)}${hex(3)}-` +
        `${hex(4)}${hex(5)}-` +
        `${hex(6)}${hex(7)}-` +
        `${hex(8)}${hex(9)}-` +
        `${hex(10)}${hex(11)}${hex(12)}${hex(13)}${hex(14)}${hex(15)}`
    );
};

/**
 * UUID v7 (RFC 9562) 생성.
 *
 * `uuid` 패키지 9.x는 v7을 아직 제공하지 않아 직접 구현한다.
 * 상위 48비트에 유닉스 밀리초를, 나머지에 난수를 채우고
 * version(7)·variant(10xx) 비트를 규격대로 덮어쓴다.
 */
const v7 = (): string => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    const timestamp = Date.now();
    // 48비트 타임스탬프를 상위 6바이트에 big-endian으로 기록
    bytes[0] = Math.floor(timestamp / 2 ** 40) & 0xff;
    bytes[1] = Math.floor(timestamp / 2 ** 32) & 0xff;
    bytes[2] = Math.floor(timestamp / 2 ** 24) & 0xff;
    bytes[3] = Math.floor(timestamp / 2 ** 16) & 0xff;
    bytes[4] = Math.floor(timestamp / 2 ** 8) & 0xff;
    bytes[5] = timestamp & 0xff;

    bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x70; // version 7
    bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80; // variant 10xx

    return stringifyBytes(bytes);
};

export interface GenerateUuidsParams {
    version: UuidVersion;
    count: number;
    /** v3·v5 전용 — 네임스페이스 UUID 문자열 */
    namespace?: string;
    /** v3·v5 전용 — 해싱할 이름 */
    name?: string;
}

export const isNameBasedVersion = (version: UuidVersion): boolean =>
    version === "v3" || version === "v5";

/** 사용자 입력이 UUID 형식인지 검사한다 (네임스페이스 직접 입력 검증용). */
export const isValidUuid = (value: string): boolean => validate(value.trim());

/**
 * 요청한 개수만큼 UUID를 만든다. 생성은 전부 브라우저 안에서만 일어난다.
 *
 * 이름 기반(v3·v5)은 입력이 같으면 결과도 같으므로 개수를 늘려도 의미가 없다.
 * 그래서 중복 목록 대신 1개만 돌려준다.
 */
export const generateUuids = ({
    version,
    count,
    namespace,
    name,
}: GenerateUuidsParams): string[] => {
    if (isNameBasedVersion(version)) {
        const ns = (namespace ?? "").trim();
        if (!isValidUuid(ns)) {
            throw new Error("네임스페이스가 올바른 UUID 형식이 아니에요.");
        }
        const generator = version === "v3" ? v3 : v5;
        try {
            return [generator(name ?? "", ns)];
        } catch {
            throw new Error(
                "네임스페이스로 쓸 수 없는 UUID예요. v1~v5 형식의 UUID를 넣어 주세요."
            );
        }
    }

    const safeCount = Math.min(
        Math.max(Math.floor(count) || 1, 1),
        MAX_UUID_COUNT
    );

    const generator = version === "v1" ? v1 : version === "v7" ? v7 : v4;
    return Array.from({ length: safeCount }, () => generator());
};
