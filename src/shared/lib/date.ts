/**
 * 날짜 포맷 유틸. 타임스탬프 변환기·JWT 디코더처럼 여러 도구가 같은 KST 표기를 쓰도록
 * shared에 둔다 (features 간 직접 import는 FSD 규약상 금지).
 */

const KST_PARTS_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
});

/** `2026. 09. 23. 14:03:13` — 브라우저 로케일 표기 그대로 */
export function formatKst(d: Date): string {
    return KST_PARTS_FORMATTER.format(d);
}

/** `2026-09-23 14:03:13` — 복사해 쓰기 좋은 고정 폭 표기 */
export function formatIsoKst(d: Date): string {
    const parts = KST_PARTS_FORMATTER.formatToParts(d);
    const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? "";
    // 일부 런타임은 자정을 "24"로 표기한다
    const hour = get("hour") === "24" ? "00" : get("hour");

    return `${get("year")}-${get("month")}-${get("day")} ${hour}:${get("minute")}:${get("second")}`;
}

/** 지금 기준 상대 시간 (`3분 전`, `2일 후`) */
export function relativeTimeFromNow(d: Date, now: number = Date.now()): string {
    const diff = now - d.getTime();
    const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

    const seconds = Math.round(diff / 1000);
    if (Math.abs(seconds) < 60) return rtf.format(-seconds, "second");
    const minutes = Math.round(seconds / 60);
    if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
    const hours = Math.round(minutes / 60);
    if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
    const days = Math.round(hours / 24);
    if (Math.abs(days) < 30) return rtf.format(-days, "day");
    const months = Math.round(days / 30);
    if (Math.abs(months) < 12) return rtf.format(-months, "month");
    const years = Math.round(days / 365);
    return rtf.format(-years, "year");
}
