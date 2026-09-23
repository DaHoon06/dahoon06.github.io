/** 지원하는 UUID 버전. v2는 사실상 쓰이지 않아 제외한다. */
export type UuidVersion = "v1" | "v3" | "v4" | "v5" | "v7";

/** 이름 기반(v3·v5) 생성에 쓰는 네임스페이스 프리셋 키. */
export type NamespacePreset = "DNS" | "URL" | "OID" | "X500" | "CUSTOM";

/** 출력 문자열을 다듬는 옵션. 생성 결과 자체는 바뀌지 않는다. */
export interface UuidFormatOptions {
    /** 대문자로 출력 */
    uppercase: boolean;
    /** 하이픈 유지 (끄면 32자리 연속 문자열) */
    hyphens: boolean;
    /** 중괄호로 감싸기 (Microsoft GUID 표기) */
    braces: boolean;
}

export interface UuidVersionMeta {
    value: UuidVersion;
    label: string;
    /** 셀렉터 아래에 노출할 한 줄 설명 */
    summary: string;
    /** 이름 기반 생성 여부 (네임스페이스 + 이름 입력 필요) */
    nameBased: boolean;
}

export const UUID_VERSIONS: UuidVersionMeta[] = [
    {
        value: "v4",
        label: "v4",
        summary: "난수 기반. 특별한 이유가 없다면 이걸 쓴다.",
        nameBased: false,
    },
    {
        value: "v7",
        label: "v7",
        summary:
            "밀리초 타임스탬프 + 난수. 시간순 정렬이라 DB 인덱스에 유리하다.",
        nameBased: false,
    },
    {
        value: "v1",
        label: "v1",
        summary: "타임스탬프 + 노드 ID. 레거시 호환용.",
        nameBased: false,
    },
    {
        value: "v3",
        label: "v3",
        summary:
            "네임스페이스 + 이름을 MD5로 해싱. 같은 입력이면 항상 같은 값.",
        nameBased: true,
    },
    {
        value: "v5",
        label: "v5",
        summary: "v3와 같은 방식이되 SHA-1 사용. 이름 기반이면 v5를 권장한다.",
        nameBased: true,
    },
];

/** RFC 4122 부록 C에 정의된 표준 네임스페이스 UUID. */
export const NAMESPACE_PRESETS: {
    value: NamespacePreset;
    label: string;
    uuid: string | null;
}[] = [
    {
        value: "DNS",
        label: "DNS",
        uuid: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    },
    {
        value: "URL",
        label: "URL",
        uuid: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
    },
    {
        value: "OID",
        label: "OID",
        uuid: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
    },
    {
        value: "X500",
        label: "X.500",
        uuid: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
    },
    { value: "CUSTOM", label: "직접 입력", uuid: null },
];

export const MAX_UUID_COUNT = 1000;
