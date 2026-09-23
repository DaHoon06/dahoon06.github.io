import {
    Binary,
    Braces,
    Clock,
    Fingerprint,
    KeyRound,
    type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@shared/routes";

export type ToolItemType = {
    key: string;
    title: string;
    /** 카드 상단 영문 라벨 */
    eyebrow: string;
    description: string;
    href: string;
    icon: LucideIcon;
    tags: string[];
};

/**
 * `/tools` 허브에 깔리는 바로가기 카드 목록.
 * 도구를 추가·삭제하는 자리는 여기 한 곳이다.
 */
export const TOOL_ITEMS: ToolItemType[] = [
    {
        key: "json-formatter",
        title: "JSON 포맷터",
        eyebrow: "JSON Formatter",
        description:
            "JSON을 정리·압축하고 유효성을 검사해요. 오류 위치를 줄·글자 단위로 짚어 주고 트리로 접어 볼 수 있어요.",
        href: ROUTES.TOOLS_JSON,
        icon: Braces,
        tags: ["Format", "Minify", "Tree"],
    },
    {
        key: "jwt-decoder",
        title: "JWT 디코더",
        eyebrow: "JWT Decoder",
        description:
            "토큰의 헤더·페이로드를 풀어 보고 exp·iat를 한국 시간으로 바꿔 만료 여부를 알려 줘요. 토큰은 서버로 보내지 않아요.",
        href: ROUTES.TOOLS_JWT,
        icon: KeyRound,
        tags: ["JWT", "exp", "KST"],
    },
    {
        key: "base64-url",
        title: "Base64 · URL 인코더",
        eyebrow: "Base64 / URL Encoder",
        description:
            "한글도 깨지지 않게 Base64·URL 인코딩/디코딩하고, 이미지를 data URI로 바꾸거나 쿼리스트링을 표로 풀어 봐요.",
        href: ROUTES.TOOLS_BASE64,
        icon: Binary,
        tags: ["Base64", "URL", "data URI"],
    },
    {
        key: "timestamp-converter",
        title: "타임스탬프 변환기",
        eyebrow: "Timestamp Converter",
        description:
            "초·밀리초 유닉스 타임스탬프와 날짜 문자열을 한국 시간(KST)으로 서로 변환해요.",
        href: ROUTES.TOOLS_TIMESTAMP,
        icon: Clock,
        tags: ["Unix", "KST", "UTC"],
    },
    {
        key: "uuid-generator",
        title: "UUID 생성기",
        eyebrow: "UUID Generator",
        description:
            "v1·v3·v4·v5·v7 UUID를 한 번에 최대 1,000개까지 만들고 형식을 바꿔 복사해요.",
        href: ROUTES.TOOLS_UUID,
        icon: Fingerprint,
        tags: ["v4", "v7", "GUID"],
    },
];
