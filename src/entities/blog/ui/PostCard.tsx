import { ImageLoader } from "@shared/ui/images";
import { PostType } from "@entities/notion/@x/blog";
import { ReactElement } from "react";
import { postDateFormatter } from "../lib/format-date";

interface PostCardProps {
    post: PostType;
}

export const PostCard = ({ post }: PostCardProps): ReactElement => {
    const date = post.date?.start_date || post.createdTime;

    return (
        <article
            className="flex flex-col bg-white rounded-xl border border-zinc-200 overflow-hidden group hover:shadow-md hover:border-zinc-300 transition-all duration-200"
            style={{ animation: "fadeInUp 300ms ease-out both" }}
        >
            {/* Thumbnail */}
            <div className="relative h-44 overflow-hidden bg-zinc-100 shrink-0">
                <ImageLoader
                    src={post.thumbnail || "/images/default.png"}
                    alt={post.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                />
                {post.category && post.category.length > 0 && (
                    <div className="absolute top-2.5 left-2.5 flex gap-1 flex-wrap">
                        {post.category.map((cat) => (
                            <span
                                key={cat}
                                className="text-[10px] font-semibold bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-4 gap-2">
                <h3 className="text-sm font-bold text-zinc-800 line-clamp-2 leading-snug group-hover:text-[#ff7337] transition-colors">
                    {post.title}
                </h3>
                {post.summary && (
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                        {post.summary}
                    </p>
                )}

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">
                        {date ? postDateFormatter(date) : ""}
                    </span>
                    {post.tags?.[0] && (
                        <span className="text-[10px] font-medium text-[#ff7337] bg-orange-50 px-1.5 py-0.5 rounded">
                            {post.tags[0]}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};
