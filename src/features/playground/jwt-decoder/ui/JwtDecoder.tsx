import { useEffect, useMemo, useState, type ReactElement } from "react";
import { Check, CircleAlert, Clock, Copy, ShieldAlert } from "lucide-react";
import cn from "@shared/lib/cn";
import { useToast } from "@shared/hooks";
import { formatIsoKst, relativeTimeFromNow } from "@shared/lib/date";
import { decodeJwt, getJwtStatus, getTimeClaims } from "../lib/decode-jwt";
import { JWT_CLAIM_LABELS, type JwtJson, type JwtStatus } from "../model/types";

/** 서명은 가짜. 구조 예시용 */
const SAMPLE_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDI0IiwibmFtZSI6ImRhaG9vbjA2IiwiaXNzIjoiaHR0cHM6Ly9ibG9nLmRhaG9vbjA2LmNvbSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTc1ODU5MjAwMCwiZXhwIjoxNzU4NTk1NjAwfQ.c2lnbmF0dXJlLW5vdC12ZXJpZmllZA";

const PART_STYLES = [
    { label: "Header", text: "text-rose-600", dot: "bg-rose-500" },
    { label: "Payload", text: "text-violet-600", dot: "bg-violet-500" },
    { label: "Signature", text: "text-sky-600", dot: "bg-sky-500" },
] as const;

const StatusBadge = ({
    status,
    now,
}: {
    status: JwtStatus;
    now: number;
}): ReactElement => {
    if (status.kind === "expired") {
        return (
            <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
                <CircleAlert size={13} />
                만료됨 · {relativeTimeFromNow(status.expiredAt, now)}
            </span>
        );
    }
    if (status.kind === "not-yet-valid") {
        return (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                <Clock size={13} />
                아직 사용 전 · {relativeTimeFromNow(status.notBefore, now)}부터
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
            <Check size={13} />
            {status.expiresAt
                ? `유효 · ${relativeTimeFromNow(status.expiresAt, now)} 만료`
                : "만료 시각(exp) 없음"}
        </span>
    );
};

const ClaimTable = ({ data }: { data: JwtJson }): ReactElement => (
    <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-zinc-100">
            {Object.entries(data).map(([key, value]) => (
                <tr key={key} className="align-top">
                    <td className="w-1/3 py-2 pr-3">
                        <div className="font-mono text-[13px] font-semibold text-zinc-900">
                            {key}
                        </div>
                        {JWT_CLAIM_LABELS[key] && (
                            <div className="text-[11px] text-zinc-400">
                                {JWT_CLAIM_LABELS[key]}
                            </div>
                        )}
                    </td>
                    <td className="break-all py-2 font-mono text-[13px] text-zinc-700">
                        {typeof value === "string"
                            ? value
                            : JSON.stringify(value)}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export const JwtDecoder = (): ReactElement => {
    const { toast } = useToast();
    const [input, setInput] = useState("");
    const [now, setNow] = useState(() => Date.now());

    // 만료까지 남은 시간이 실시간으로 줄어들도록
    useEffect(() => {
        const id = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(id);
    }, []);

    const decoded = useMemo(() => {
        if (!input.trim()) return null;
        try {
            return { ok: true as const, jwt: decodeJwt(input) };
        } catch (e) {
            return {
                ok: false as const,
                message:
                    e instanceof Error ? e.message : "디코딩에 실패했어요.",
            };
        }
    }, [input]);

    const jwt = decoded?.ok ? decoded.jwt : null;
    const timeClaims = jwt ? getTimeClaims(jwt.payload) : [];
    const status = jwt ? getJwtStatus(jwt.payload, now) : null;

    const copyJson = async (label: string, data: JwtJson) => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            toast({ title: "복사되었습니다.", description: `${label} JSON` });
        } catch {
            toast({
                title: "복사하지 못했어요.",
                description: "브라우저 클립보드 권한을 확인해 주세요.",
            });
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <section>
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-900">
                        토큰
                    </h2>
                    {!input && (
                        <button
                            type="button"
                            onClick={() => setInput(SAMPLE_TOKEN)}
                            className="text-xs font-medium text-zinc-400 hover:text-zinc-900"
                        >
                            예시 넣기
                        </button>
                    )}
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    spellCheck={false}
                    placeholder="eyJhbGciOi... (Bearer 접두어는 붙어 있어도 괜찮아요)"
                    className={cn(
                        "h-32 w-full resize-y break-all rounded-xl border bg-white p-3 font-mono text-[13px] leading-6 outline-none transition-colors focus:ring-2",
                        decoded && !decoded.ok
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-100"
                    )}
                />
                {decoded && !decoded.ok && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                        <CircleAlert size={15} />
                        {decoded.message}
                    </p>
                )}
            </section>

            {jwt && status && (
                <>
                    {/* 색 구분된 원문 */}
                    <section className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
                        <p className="break-all font-mono text-[13px] leading-6">
                            {PART_STYLES.map((style, index) => (
                                <span key={style.label}>
                                    {index > 0 && (
                                        <span className="text-zinc-400">.</span>
                                    )}
                                    <span className={style.text}>
                                        {jwt.parts[index]}
                                    </span>
                                </span>
                            ))}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3">
                            {PART_STYLES.map((style) => (
                                <span
                                    key={style.label}
                                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500"
                                >
                                    <span
                                        className={cn(
                                            "h-2 w-2 rounded-full",
                                            style.dot
                                        )}
                                    />
                                    {style.label}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* 상태 + 시간 클레임 */}
                    <section>
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <h2 className="text-sm font-semibold text-zinc-900">
                                유효 기간
                            </h2>
                            <StatusBadge status={status} now={now} />
                        </div>
                        {timeClaims.length === 0 ? (
                            <p className="text-sm text-zinc-400">
                                시간 관련 클레임(iat·nbf·exp)이 없어요.
                            </p>
                        ) : (
                            <ul className="divide-y divide-zinc-100 rounded-xl border border-zinc-200">
                                {timeClaims.map(({ claim, date }) => (
                                    <li
                                        key={claim}
                                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-2.5"
                                    >
                                        <div>
                                            <span className="font-mono text-[13px] font-semibold text-zinc-900">
                                                {claim}
                                            </span>
                                            <span className="ml-2 text-[11px] text-zinc-400">
                                                {JWT_CLAIM_LABELS[claim]}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-[13px] text-zinc-800">
                                                {formatIsoKst(date)} KST
                                            </div>
                                            <div className="text-[11px] text-zinc-400">
                                                {relativeTimeFromNow(date, now)}
                                                {" · "}
                                                {date.getTime() / 1000}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* 헤더 · 페이로드 */}
                    <div className="grid gap-4 lg:grid-cols-2">
                        {(
                            [
                                ["Header", jwt.header, PART_STYLES[0]],
                                ["Payload", jwt.payload, PART_STYLES[1]],
                            ] as const
                        ).map(([label, data, style]) => (
                            <section
                                key={label}
                                className="min-w-0 rounded-xl border border-zinc-200 p-4"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <h2 className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                                        <span
                                            className={cn(
                                                "h-2 w-2 rounded-full",
                                                style.dot
                                            )}
                                        />
                                        {label}
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => copyJson(label, data)}
                                        aria-label={`${label} 복사`}
                                        className="rounded-md border border-zinc-200 p-1.5 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                                    >
                                        <Copy size={14} />
                                    </button>
                                </div>
                                <ClaimTable data={data} />
                            </section>
                        ))}
                    </div>

                    <p className="flex items-start gap-1.5 text-xs leading-relaxed text-zinc-400">
                        <ShieldAlert size={14} className="mt-px shrink-0" />
                        디코딩만 해요. 서명은 검증하지 않으므로, 여기서 읽힌다고
                        해서 믿을 수 있는 토큰이라는 뜻은 아니에요.
                    </p>
                </>
            )}
        </div>
    );
};

export default JwtDecoder;
