import React, { useEffect, useState } from "react";
import { relativeTimeFromNow } from "../utils/relativeTimeFromNow";

export default function PlaygroundPage() {
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [nowTick, setNowTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setNowTick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, []);

    function parseInputToDate(raw: string): Date | null {
        const s = raw.trim();
        if (!s) return null;

        const num = Number(s);
        if (!Number.isNaN(num) && isFinite(num)) {
            const digits = s.replace(/[^0-9]/g, "");
            const ms = digits.length <= 10 ? num * 1000 : num;
            const d = new Date(ms);
            if (!isNaN(d.getTime())) return d;
        }

        const parsed = Date.parse(s);
        if (!Number.isNaN(parsed)) return new Date(parsed);

        const normalized = s.replace(" ", "T");
        const parsed2 = Date.parse(normalized);
        if (!Number.isNaN(parsed2)) return new Date(parsed2);

        return null;
    }

    function handleConvert() {
        setError(null);
        const d = parseInputToDate(input);
        if (!d) {
            setDate(null);
            setError("잘못된 타임스탬프 또는 날짜 형식이에요.");
            return;
        }
        setDate(d);
    }

    function formatKorea(d: Date) {
        return new Intl.DateTimeFormat("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(d);
    }

    function formatIsoKorea(d: Date) {
        const parts = new Intl.DateTimeFormat("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).formatToParts(d);

        const get = (type: string) =>
            parts.find((p) => p.type === type)?.value ?? "";
        return `${get("year")}-${get("month")}-${get("day")} ${get("hour")} : ${get("minute")} : ${get("second")}`.replace(
            /\s*:\s*/g,
            ":"
        );
    }

    function formatGmt(d: Date) {
        const en = new Intl.DateTimeFormat("en-GB", {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).formatToParts(d);

        const get = (type: string) =>
            en.find((p) => p.type === type)?.value ?? "";
        // Example target: GMT: 2025년 October 16일 Thursday PM 4:03:13
        const year = get("year");
        const month = get("month"); // English month name
        const day = get("day");
        const weekday = get("weekday");
        const hourStr = get("hour");
        const minute = get("minute");
        const second = get("second");

        let hour = Number(hourStr);
        const isPm = hour >= 12;
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = isPm ? "PM" : "AM";

        return `GMT: ${year}년 ${month} ${day}일 ${weekday} ${ampm} ${hour12}:${minute}:${second}`;
    }

    function copy(text: string) {
        navigator.clipboard?.writeText(text);
    }

    useEffect(() => {
        // auto-convert when input looks like a timestamp number (quick UX)
        if (!input) {
            setError(null);
            setDate(null);
            return;
        }

        const maybe = parseInputToDate(input);
        if (maybe) {
            setError(null);
            setDate(maybe);
        }
    }, [input]);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <section className="mb-6">
                <h1 className="text-2xl font-semibold mb-2">
                    Timestamp Converter (한국 시간)
                </h1>
                <p className="text-sm text-gray-600">
                    숫자 타임스탬프(초 또는 밀리초) 또는 ISO/날짜 문자열을
                    입력하면 서울(한국 표준시)로 변환해 줍니다.
                </p>
            </section>

            <section className="mb-6">
                <label className="block mb-2 text-sm font-medium">
                    입력 (예: 1629910800, 1629910800000, 2021-08-25T12:00:00Z)
                </label>
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="타임스탬프 또는 날짜 문자열을 입력"
                        className="flex-1 w-full rounded-md border border-gray-300 bg-white px-3 text-base sm:text-sm leading-6 h-11 outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600"
                    />
                    <button
                        onClick={handleConvert}
                        className="px-4 rounded-md text-sm bg-slate-800 text-white h-11 sm:h-10 hover:bg-slate-900 transition-colors"
                    >
                        변환
                    </button>
                </div>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </section>

            <section>
                <div className="rounded border p-4 bg-white shadow-sm">
                    {date ? (
                        <>
                            <div className="mb-3">
                                <div className="text-sm text-gray-500">
                                    한국 시간 (Asia/Seoul)
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="font-mono text-lg">
                                        {formatKorea(date)}
                                    </div>
                                    <button
                                        onClick={() => copy(formatKorea(date))}
                                        className="text-sm px-2 py-1 rounded border"
                                    >
                                        복사
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="text-sm text-gray-500">
                                    ISO (KST)
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="font-mono">
                                        {formatIsoKorea(date)}
                                    </div>
                                    <button
                                        onClick={() =>
                                            copy(formatIsoKorea(date))
                                        }
                                        className="text-sm px-2 py-1 rounded border"
                                    >
                                        복사
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="text-sm text-gray-500">
                                    GMT (UTC)
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="font-mono">
                                        {formatGmt(date)}
                                    </div>
                                    <button
                                        onClick={() => copy(formatGmt(date))}
                                        className="text-sm px-2 py-1 rounded border"
                                    >
                                        복사
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div>
                                    <div className="text-xs text-gray-500">
                                        Unix (seconds)
                                    </div>
                                    <div className="font-mono">
                                        {Math.floor(date.getTime() / 1000)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">
                                        Unix (ms)
                                    </div>
                                    <div className="font-mono">
                                        {date.getTime()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">
                                        브라우저 로컬
                                    </div>
                                    <div className="font-mono">
                                        {date.toString()}
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600">
                                지금과의 상대 시간:{" "}
                                <span className="font-medium">
                                    {relativeTimeFromNow(date)}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-500">
                            변환된 날짜가 없습니다. 입력 후 변환 버튼을 누르거나
                            숫자를 입력하면 자동으로 변환됩니다.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
