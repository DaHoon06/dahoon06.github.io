import { ReactElement } from "react";
import { useVisitorStats } from "../model/use-visitor-stats";

const formatCount = (value: number) => value.toLocaleString("ko-KR");

/** 사이드 네비게이션 하단의 Today / Total 방문자 수. 서버에 닿지 않으면 숨긴다 */
export const VisitorStats = (): ReactElement | null => {
    const { data, isError } = useVisitorStats();
    if (isError) return null;

    const items = [
        { label: "Today", value: data?.today },
        { label: "Total", value: data?.total },
    ];

    return (
        <section className="flex divide-x divide-zinc-100 rounded-2xl border border-zinc-200">
            {items.map(({ label, value }) => (
                <div
                    key={label}
                    className="flex flex-1 flex-col items-center gap-1 py-3"
                >
                    <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                        {label}
                    </span>
                    {value === undefined ? (
                        <span className="h-5 w-10 animate-pulse rounded bg-zinc-100" />
                    ) : (
                        <span className="text-[15px] font-bold tabular-nums tracking-tight text-zinc-900">
                            {formatCount(value)}
                        </span>
                    )}
                </div>
            ))}
        </section>
    );
};
