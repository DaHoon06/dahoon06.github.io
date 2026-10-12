import { ReactElement } from "react";
import type { NewsArchiveSummary } from "@entities/news";
import { NewsArchiveCalendar } from "./NewsArchiveCalendar";

interface NewsArchiveNavProps {
    summaries: NewsArchiveSummary[];
    /** 현재 보고 있는 날짜 */
    currentDate?: string;
}

export const NewsArchiveNav = ({
    summaries,
    currentDate,
}: NewsArchiveNavProps): ReactElement | null => {
    if (summaries.length === 0) return null;

    return (
        <div className="space-y-8">
            <section>
                <h2 className="mb-3 text-[13px] font-semibold tracking-tight text-zinc-900">
                    지난 소식
                </h2>
                <NewsArchiveCalendar
                    summaries={summaries}
                    currentDate={currentDate}
                />
            </section>

            <p className="rounded-xl bg-zinc-50 p-4 text-[11px] leading-relaxed text-zinc-400">
                매일 07:00(KST)에 RSS · Hacker News · GitHub Trending 에서 자동
                수집합니다. 요약문은 원문 피드가 제공한 발췌입니다.
            </p>
        </div>
    );
};
