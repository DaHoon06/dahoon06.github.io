import { PostType } from "@entities/notion/@x/blog";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { postDateFormatter } from "../lib/format-date";

interface BannerCardProps {
    post: PostType;
}

export const BannerCard = ({ post }: BannerCardProps) => {
    const date = post.date?.start_date || post.createdTime;

    return (
        <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white group hover:border-zinc-300 hover:shadow-md transition-all duration-200">
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Thumbnail */}
                <div className="relative h-52 md:h-auto md:col-span-2 overflow-hidden bg-zinc-100">
                    <Image
                        src={post.thumbnail || "/images/default.png"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between gap-5">
                    <div className="space-y-3">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-1.5">
                            {post.category?.map((cat) => (
                                <span
                                    key={cat}
                                    className="text-[11px] font-semibold bg-[#111] text-white px-2 py-0.5 rounded"
                                >
                                    {cat}
                                </span>
                            ))}
                            {post.tags?.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[11px] font-medium bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-bold text-zinc-800 leading-snug line-clamp-2 group-hover:text-[#ff7337] transition-colors">
                            {post.title}
                        </h2>

                        {/* Summary */}
                        {post.summary && (
                            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 md:line-clamp-3">
                                {post.summary}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                        <span className="text-xs text-zinc-400">
                            {date ? postDateFormatter(date) : ""}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff7337]">
                            읽어보기
                            <ArrowRight size={14} />
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
};
