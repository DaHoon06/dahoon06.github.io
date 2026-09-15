import { ChangeEvent, ReactElement, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
    NEWS_GROUPS,
    NewsListItem,
    type NewsGroupId,
    type NewsItem,
} from "@entities/news";
import { EmptyState } from "@shared/ui/empty-state";
import cn from "@shared/lib/cn";

interface NewsListRendererProps {
    items: NewsItem[];
}

type GroupFilter = NewsGroupId | "all";

export const NewsListRenderer = ({
    items,
}: NewsListRendererProps): ReactElement => {
    const [group, setGroup] = useState<GroupFilter>("all");
    const [keyword, setKeyword] = useState("");

    // 필터 칩에 건수를 같이 보여주려면 그룹별 집계가 먼저 필요하다
    const counts = useMemo(() => {
        const acc: Record<string, number> = {};
        items.forEach((item) => {
            acc[item.group] = (acc[item.group] ?? 0) + 1;
        });
        return acc;
    }, [items]);

    const filtered = useMemo(() => {
        const query = keyword.trim().toLowerCase();

        return items.filter((item) => {
            if (group !== "all" && item.group !== group) return false;
            if (!query) return true;

            return (
                item.title.toLowerCase().includes(query) ||
                item.summary.toLowerCase().includes(query) ||
                item.sourceName.toLowerCase().includes(query)
            );
        });
    }, [items, group, keyword]);

    const visibleGroups = NEWS_GROUPS.filter((meta) => counts[meta.id]);

    return (
        <div>
            <div className="flex flex-col gap-3 border-b border-zinc-100 pb-4">
                <label className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 focus-within:border-zinc-400">
                    <Search size={15} className="shrink-0 text-zinc-400" />
                    <input
                        type="search"
                        value={keyword}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setKeyword(event.target.value)
                        }
                        placeholder="제목 · 소스 검색"
                        className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
                    />
                </label>

                <div className="flex flex-wrap gap-1.5">
                    <FilterChip
                        active={group === "all"}
                        label="전체"
                        count={items.length}
                        onClick={() => setGroup("all")}
                    />
                    {visibleGroups.map((meta) => (
                        <FilterChip
                            key={meta.id}
                            active={group === meta.id}
                            label={meta.label}
                            count={counts[meta.id] ?? 0}
                            onClick={() => setGroup(meta.id)}
                        />
                    ))}
                </div>
            </div>

            {filtered.length > 0 ? (
                <div>
                    {filtered.map((item) => (
                        <NewsListItem key={item.slug} item={item} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="조건에 맞는 소식이 없어요"
                    description="검색어나 분류를 바꿔보세요."
                />
            )}
        </div>
    );
};

interface FilterChipProps {
    active: boolean;
    label: string;
    count: number;
    onClick: () => void;
}

const FilterChip = ({
    active,
    label,
    count,
    onClick,
}: FilterChipProps): ReactElement => (
    <button
        type="button"
        onClick={onClick}
        className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            active
                ? "bg-[#111] text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
        )}
    >
        {label}
        <span
            className={cn("ml-1", active ? "text-white/60" : "text-zinc-400")}
        >
            {count}
        </span>
    </button>
);
