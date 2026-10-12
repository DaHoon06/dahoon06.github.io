import { ReactElement, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatArchiveDate, type NewsArchiveSummary } from "@entities/news";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

interface NewsArchiveCalendarProps {
    summaries: NewsArchiveSummary[];
    /** 현재 보고 있는 날짜 */
    currentDate?: string;
}

/** `2026-10` → [2026, 10] */
const parseMonth = (monthKey: string): [number, number] => [
    Number(monthKey.slice(0, 4)),
    Number(monthKey.slice(5, 7)),
];

/** `2026-10` + 1 → `2026-11`. 날짜 문자열만 다루므로 UTC로 계산해 TZ 영향을 없앤다 */
const shiftMonth = (monthKey: string, delta: number): string => {
    const [year, month] = parseMonth(monthKey);
    const shifted = new Date(Date.UTC(year, month - 1 + delta, 1));
    return shifted.toISOString().slice(0, 7);
};

/** 달 앞쪽 빈칸(null) + 1일~말일. 일요일 시작 */
const buildMonthCells = (monthKey: string): (string | null)[] => {
    const [year, month] = parseMonth(monthKey);
    const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();

    return [
        ...Array.from({ length: firstWeekday }, () => null),
        ...Array.from(
            { length: lastDay },
            (_, i) => `${monthKey}-${String(i + 1).padStart(2, "0")}`
        ),
    ];
};

/**
 * PC aside 전용 날짜 네비게이션 — 수집된 날만 색을 채우고 링크로 건다.
 *
 * 목록으로 늘어놓으면 하루 걸러 빠진 날(수집 실패)이 눈에 안 띄고 30일 넘게 쌓이면
 * 길어지기만 한다. 달력으로 두면 빈 날이 그대로 보이고 높이도 고정된다.
 */
export const NewsArchiveCalendar = ({
    summaries,
    currentDate,
}: NewsArchiveCalendarProps): ReactElement | null => {
    const countByDate = useMemo(
        () => new Map(summaries.map(({ date, count }) => [date, count])),
        [summaries]
    );
    // summaries 는 최신순이다
    const latestMonth = summaries[0]?.date.slice(0, 7) ?? "";
    const oldestMonth = summaries[summaries.length - 1]?.date.slice(0, 7) ?? "";
    const initialMonth = (currentDate ?? summaries[0]?.date ?? "").slice(0, 7);

    const [monthKey, setMonthKey] = useState(initialMonth);

    // 다른 날짜 페이지로 이동하면 그 날짜가 있는 달로 맞춘다
    useEffect(() => {
        setMonthKey(initialMonth);
    }, [initialMonth]);

    const cells = useMemo(() => buildMonthCells(monthKey), [monthKey]);

    if (summaries.length === 0) return null;

    const [year, month] = parseMonth(monthKey);
    const canPrev = monthKey > oldestMonth;
    const canNext = monthKey < latestMonth;

    return (
        <div>
            <header className="mb-2 flex items-center justify-between pl-1">
                <span className="text-[13px] font-medium text-zinc-700">
                    {year}년 {month}월
                </span>
                <span className="flex items-center">
                    <MonthButton
                        label="이전 달"
                        disabled={!canPrev}
                        onClick={() => setMonthKey(shiftMonth(monthKey, -1))}
                    >
                        <ChevronLeft aria-hidden className="size-3.5" />
                    </MonthButton>
                    <MonthButton
                        label="다음 달"
                        disabled={!canNext}
                        onClick={() => setMonthKey(shiftMonth(monthKey, 1))}
                    >
                        <ChevronRight aria-hidden className="size-3.5" />
                    </MonthButton>
                </span>
            </header>

            <div className="grid grid-cols-7 gap-y-1">
                {WEEKDAYS.map((weekday, index) => (
                    <span
                        key={weekday}
                        className={cn(
                            "flex h-7 items-center justify-center text-[11px]",
                            index === 0 ? "text-red-400" : "text-zinc-400"
                        )}
                    >
                        {weekday}
                    </span>
                ))}

                {cells.map((date, index) => {
                    if (!date) return <span key={`blank-${index}`} />;

                    const day = Number(date.slice(8));
                    const count = countByDate.get(date);
                    const cellClass =
                        "mx-auto flex size-8 items-center justify-center rounded-full text-[12px] tabular-nums";

                    // 수집 안 된 날 — 갈 곳이 없으니 링크가 아니다
                    if (count === undefined) {
                        return (
                            <span
                                key={date}
                                className={cn(cellClass, "text-zinc-300")}
                            >
                                {day}
                            </span>
                        );
                    }

                    const isActive = date === currentDate;
                    const label = `${formatArchiveDate(date)} ${count}건`;

                    return (
                        <Link
                            key={date}
                            href={ROUTES.NEWS_DETAIL(date)}
                            aria-label={label}
                            title={label}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                cellClass,
                                "font-semibold transition-colors",
                                isActive
                                    ? "bg-zinc-900 text-white"
                                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                            )}
                        >
                            {day}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

interface MonthButtonProps {
    label: string;
    disabled: boolean;
    onClick: () => void;
    children: ReactElement;
}

const MonthButton = ({
    label,
    disabled,
    onClick,
    children,
}: MonthButtonProps): ReactElement => (
    <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        className="flex size-7 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none disabled:text-zinc-200"
    >
        {children}
    </button>
);
