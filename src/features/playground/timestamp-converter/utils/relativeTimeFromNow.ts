export function relativeTimeFromNow(d: Date) {
    const diff = Date.now() - d.getTime();
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
