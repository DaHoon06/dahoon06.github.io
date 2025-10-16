import { ImageLoader } from "@shared/ui/images";
import { PostType } from "@entities/notion/types";
import { Author } from "./Author";
import { ReactElement } from "react";
import { postDateFormatter } from "../lib/formatDate";

interface PostCardProps {
    post: PostType;
}

export const PostCard = ({ post }: PostCardProps): ReactElement => {
    return (
        <article
            className="flex flex-col bg-white rounded-[14px] border border-gray-200 shadow-md gap-1 min-h-[336px] will-change-transform"
            style={{
                animation: "fadeInUp 300ms ease-out both",
            }}
        >
            <ImageLoader
                src={post.thumbnail || "/images/default.png"}
                alt={post.title}
                className=" w-full rounded-t-[14px] object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="p-3 md:p-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        {post.category &&
                            post.category.map((category) => (
                                <span
                                    key={category}
                                    className="text-sm bg-[#030213] text-white rounded-md px-2 py-1"
                                >
                                    {category}
                                </span>
                            ))}
                    </div>

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
