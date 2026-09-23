import { decodeBase64 } from "@shared/lib/base64";
import {
    JWT_TIME_CLAIMS,
    type DecodedJwt,
    type JwtJson,
    type JwtStatus,
    type JwtTimeClaim,
} from "../model/types";

function decodeSegment(segment: string, label: string): JwtJson {
    let text: string;
    try {
        text = decodeBase64(segment);
    } catch {
        throw new Error(`${label}를 Base64URL로 디코딩하지 못했어요.`);
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(text);
    } catch {
        throw new Error(`${label}가 JSON 형식이 아니에요.`);
    }
    if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
    ) {
        throw new Error(`${label}는 JSON 객체여야 해요.`);
    }
    return parsed as JwtJson;
}

export function decodeJwt(raw: string): DecodedJwt {
    // 헤더에서 통째로 복사해 오는 경우가 많아 `Bearer ` 접두어와 공백을 걷어낸다
    const token = raw
        .trim()
        .replace(/^Bearer\s+/i, "")
        .replace(/\s+/g, "");
    const segments = token.split(".");
    const [headerPart, payloadPart, signature] = segments;

    if (segments.length === 5) {
        throw new Error(
            "5개 조각으로 된 JWE(암호화 토큰)예요. 키 없이는 내용을 볼 수 없어요."
        );
    }
    if (
        segments.length !== 3 ||
        headerPart === undefined ||
        payloadPart === undefined ||
        signature === undefined
    ) {
        throw new Error(
            `JWT는 점(.)으로 나뉜 3개 조각이어야 하는데 ${segments.length}개예요.`
        );
    }

    return {
        header: decodeSegment(headerPart, "헤더"),
        payload: decodeSegment(payloadPart, "페이로드"),
        signature,
        parts: [headerPart, payloadPart, signature],
    };
}

/** NumericDate(초) → Date. 숫자가 아니면 null */
export function claimToDate(value: unknown): Date | null {
    if (typeof value !== "number" || !Number.isFinite(value)) return null;
    return new Date(value * 1000);
}

export function getTimeClaims(
    payload: JwtJson
): { claim: JwtTimeClaim; date: Date }[] {
    return JWT_TIME_CLAIMS.flatMap((claim) => {
        const date = claimToDate(payload[claim]);
        return date ? [{ claim, date }] : [];
    });
}

export function getJwtStatus(payload: JwtJson, now: number): JwtStatus {
    const exp = claimToDate(payload.exp);
    const nbf = claimToDate(payload.nbf);

    if (exp && exp.getTime() <= now) return { kind: "expired", expiredAt: exp };
    if (nbf && nbf.getTime() > now) {
        return { kind: "not-yet-valid", notBefore: nbf };
    }
    return { kind: "valid", expiresAt: exp };
}
