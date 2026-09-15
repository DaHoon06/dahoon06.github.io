import { ReactElement } from "react";
import { ImageLoader } from "@shared/ui/images";
import { PostType } from "@entities/notion/@x/blog";
import { formatDate } from "../lib/format-date";

interface PostListItemProps {
    post: PostType;
}

export const PostListItem = ({ post }: PostListItemProps): ReactElement => {
    const date = post.date?.start_date || post.createdTime;

    return (
        <article className="group py-7">
            <div className="flex gap-4 sm:gap-6">
                {/* 썸네일이 있을 때만 제목·날짜 앞쪽에 노출 */}
                {post.thumbnail && (
                    <div className="relative h-[80px] w-[112px] shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:h-[104px] sm:w-[152px]">
                        <ImageLoader
                            src={post.thumbnail}
                            alt={post.title}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            fill
                            sizes="152px"
                        />
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-[17px] font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-[#ff7337] sm:text-lg">
                        {post.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-400">
                        {date ? formatDate(date, "ko-KR") : ""}
                    </p>
                    {post.summary && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                            {post.summary}
                        </p>
                    )}
                </div>
            </div>

            {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
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
        </article>
    );
};
