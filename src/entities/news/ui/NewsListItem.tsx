import { ReactElement } from "react";
import { ArrowUpRight } from "lucide-react";
import cn from "@shared/lib/cn";
import type { NewsItem } from "../model/news.types";
import {
    formatEngagement,
    formatPublishedAt,
    getGroupLabel,
    getHostname,
} from "../lib/news-format";

interface NewsListItemProps {
    item: NewsItem;
}

export const NewsListItem = ({ item }: NewsListItemProps): ReactElement => {
    const engagement = formatEngagement(item);
    const hostname = getHostname(item.url);

    return (
        <article className="group border-b border-zinc-100 py-5 last:border-b-0">
            <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-400">
                            <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-medium text-zinc-600">
                                {getGroupLabel(item.group)}
                            </span>
                            <span className="font-medium text-zinc-500">
                                {item.sourceName}
                            </span>
                            <span aria-hidden>·</span>
                            <span>{formatPublishedAt(item.publishedAt)}</span>
                            {engagement && (
                                <>
                                    <span aria-hidden>·</span>
                                    <span className="font-medium text-primary-900">
                                        {engagement}
                                    </span>
                                </>
                            )}
                            {item.language === "en" && (
                                <span className="rounded border border-zinc-200 px-1 py-px text-[10px] font-medium text-zinc-400">
                                    EN
                                </span>
                            )}
                        </div>

                        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-primary-900 sm:text-base">
                            {item.title}
                        </h3>

                        {item.summary && (
                            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-zinc-500">
                                {item.summary}
                            </p>
                        )}

                        {hostname && (
                            <p className="mt-2 text-[11px] text-zinc-400">
                                {hostname}
                            </p>
                        )}
                    </div>

                    <ArrowUpRight
                        size={16}
                        className={cn(
                            "mt-1 shrink-0 text-zinc-300 transition-colors",
                            "group-hover:text-primary-900"
                        )}
                    />
                </div>
            </a>
        </article>
    );
};
