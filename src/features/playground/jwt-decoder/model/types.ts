export type JwtJson = Record<string, unknown>;

export interface DecodedJwt {
    header: JwtJson;
    payload: JwtJson;
    /** base64url 그대로. 검증하지 않는다 */
    signature: string;
    /** 원문을 `.` 기준으로 나눈 세 조각 (색 구분 표시용) */
    parts: [string, string, string];
}

export type JwtStatus =
    | { kind: "valid"; expiresAt: Date | null }
    | { kind: "expired"; expiredAt: Date }
    | { kind: "not-yet-valid"; notBefore: Date };

/** 초 단위 NumericDate로 오는 표준 시간 클레임 */
export const JWT_TIME_CLAIMS = ["iat", "nbf", "exp", "auth_time"] as const;
export type JwtTimeClaim = (typeof JWT_TIME_CLAIMS)[number];

/** 표준 클레임 한 줄 설명 (RFC 7519 · OIDC Core) */
export const JWT_CLAIM_LABELS: Record<string, string> = {
    iss: "발급자 (Issuer)",
    sub: "주체 (Subject)",
    aud: "대상 (Audience)",
    exp: "만료 시각 (Expiration)",
    nbf: "사용 시작 시각 (Not Before)",
    iat: "발급 시각 (Issued At)",
    jti: "토큰 ID (JWT ID)",
    auth_time: "인증 시각",
    nonce: "재사용 방지 값",
    scope: "권한 범위",
    azp: "요청한 클라이언트",
    alg: "서명 알고리즘",
    typ: "토큰 타입",
    kid: "키 ID",
    cty: "콘텐츠 타입",
};
