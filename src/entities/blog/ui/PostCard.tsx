import { ImageLoader } from "@shared/ui/images";
import { PostType } from "@entities/notion/@x/blog";
import { Author } from "./Author";
import { ReactElement } from "react";
import { postDateFormatter } from "../lib/format-date";

interface PostCardProps {
    post: PostType;
}

export const PostCard = ({ post }: PostCardProps): ReactElement => {
    return (
        <article
            className="flex flex-col bg-white rounded-[14px] border border-gray-200 shadow-md gap-1 min-h-[300px] will-change-transform"
            style={{
                animation: "fadeInUp 300ms ease-out both",
            }}
        >
            <div className="relative w-full h-48 overflow-hidden rounded-t-[14px]">
                <ImageLoader
                    src={post?.thumbnail || "/images/default.png"}
                    alt={post.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                />
                {post.category && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2 flex-wrap">
                        {post.category.map((category) => (
                            <span
                                key={category}
                                className="text-xs bg-[#FFE6CC] text-[#E85C0D] rounded-md px-2 py-1 font-medium"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="p-3 md:p-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-bold text-gray-800">
                            {post.title}
                        </h3>
                        {post.summary && (
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {post.summary}
                            </p>
                        )}
                    </div>

                    <footer className="flex items-center justify-between">
                        <Author
                            profileImage={post.author?.[0]?.profile_photo || ""}
                            name={post.author?.[0]?.name || ""}
                        />
                        {post.date && (
                            <span className="text-sm text-gray-500">
                                {postDateFormatter(
                                    post.date.start_date || post.createdTime
                                )}
                            </span>
                        )}
                    </footer>
                </div>
            </div>
        </article>
    );
};
