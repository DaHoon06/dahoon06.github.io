import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import {
    formatArchiveDateShort,
    type NewsArchiveSummary,
} from "@entities/news";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";
import { NewsCalendarSheet } from "./NewsCalendarSheet";

/** 칩으로 까는 최근 날짜 수 — 그 이전은 달력 시트에서 고른다 */
const STRIP_LIMIT = 30;

interface NewsArchiveStripProps {
    /** 전체 목록(최신순). 칩은 최근 `STRIP_LIMIT`개만, 달력 시트는 전부 쓴다 */
    summaries: NewsArchiveSummary[];
    /** 현재 보고 있는 날짜 */
    currentDate?: string;
}

/**
 * 모바일·태블릿 전용 날짜 네비게이션.
 *
 * PC는 `NewsArchiveNav`(aside)로 지난 소식을 넘나들지만 aside 자체가 `lg` 미만에서
 * 숨겨져 있어 모바일에선 오늘 치만 볼 수 있었다. 같은 목록을 가로 스크롤 칩으로 깐다.
 * 오래된 날짜는 칩을 한참 밀어야 하니, 달력 버튼으로 바텀시트를 열어 바로 고르게 한다.
 */
export const NewsArchiveStrip = ({
    summaries,
    currentDate,
}: NewsArchiveStripProps): ReactElement | null => {
    const trackRef = useRef<HTMLOListElement>(null);
    const activeRef = useRef<HTMLLIElement>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const closeCalendar = useCallback(() => setIsCalendarOpen(false), []);

    /* 오래된 날짜를 보고 있으면 칩이 화면 밖에 있다 — 가운데로 당겨 둔다.
       scrollIntoView 는 페이지까지 같이 스크롤해서 직접 계산한다. */
    useEffect(() => {
        const track = trackRef.current;
        const active = activeRef.current;
        if (!track || !active) return;

        track.scrollLeft =
            active.offsetLeft - track.clientWidth / 2 + active.clientWidth / 2;
    }, [currentDate]);

    if (summaries.length === 0) return null;

    return (
        <nav aria-label="지난 소식" className="mb-6 lg:hidden">
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[13px] font-semibold tracking-tight text-zinc-900">
                    지난 소식
                </h2>
                <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={isCalendarOpen}
                    onClick={() => setIsCalendarOpen(true)}
                    className="-mr-1.5 flex items-center gap-1 rounded-full px-2 py-1 text-[12px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                    <CalendarDays aria-hidden className="size-3.5" />
                    달력
                </button>
            </div>
            <ol
                ref={trackRef}
                className="scrollbar-hide -mx-5 flex snap-x gap-2 scroll-px-5 overflow-x-auto px-5 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6"
            >
                {summaries.slice(0, STRIP_LIMIT).map(({ date, count }) => {
                    const isActive = date === currentDate;
                    return (
                        <li
                            key={date}
                            ref={isActive ? activeRef : undefined}
                            className="shrink-0 snap-start"
                        >
                            <Link
                                href={ROUTES.NEWS_DETAIL(date)}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors",
                                    isActive
                                        ? "border-zinc-900 bg-zinc-900 font-semibold text-white"
                                        : "border-zinc-200 text-zinc-500"
                                )}
                            >
                                <span>{formatArchiveDateShort(date)}</span>
                                <span
                                    className={cn(
                                        "text-[11px]",
                                        isActive
                                            ? "text-zinc-400"
                                            : "text-zinc-300"
                                    )}
                                >
                                    {count}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ol>

            <NewsCalendarSheet
                open={isCalendarOpen}
                onClose={closeCalendar}
                summaries={summaries}
                currentDate={currentDate}
            />
        </nav>
    );
};
