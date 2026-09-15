import { ReactElement } from "react";
import { PostType } from "@entities/notion/@x/blog";
import { Author } from "./Author";
import { formatDate } from "../lib/format-date";

interface ArchivingCardProps {
    post: PostType;
}

export const ArchivingCard = ({ post }: ArchivingCardProps): ReactElement => {
    const date = post.date?.start_date || post.createdTime;

    return (
        <article className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-200 hover:border-zinc-300 hover:shadow-md">
            {/* masonry 높이를 이미지 원본 비율로 만들기 위해 고정 높이를 주지 않는다 */}
            <div className="overflow-hidden bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.thumbnail || "/images/default.png"}
                    alt={post.title}
                    loading="lazy"
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-[15px] font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-[#ff7337]">
                        {post.title}
                    </h3>
                    {post.summary && (
                        <p className="line-clamp-3 text-sm leading-relaxed text-zinc-500">
                            {post.summary}
                        </p>
                    )}
                </div>

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <footer className="flex items-center gap-2 border-t border-zinc-100 pt-3">
                    {post.author?.[0] && (
                        <Author
                            profileImage={post.author[0].profile_photo || ""}
                            name={post.author[0].name || ""}
                        />
                    )}
                    {date && (
                        <span className="text-xs text-zinc-400">
                            {formatDate(date, "ko-KR")}
                        </span>
                    )}
                </footer>
            </div>
        </article>
    );
};
