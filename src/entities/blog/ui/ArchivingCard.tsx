import { ImageLoader } from "@shared/ui/images";
import { PostType } from "@entities/notion/@x/blog";
import { Author } from "./Author";
import { ReactElement } from "react";
import { postDateFormatter } from "../lib/format-date";

interface ArchivingCardProps {
    post: PostType;
}

export const ArchivingCard = ({ post }: ArchivingCardProps): ReactElement => {
    return (
        <article className="flex bg-white rounded-[14px] border border-gray-200 shadow-md gap-1">
            <div className="relative h-[180px] w-[280px] flex-shrink-0 overflow-hidden rounded-l-[14px]">
                <ImageLoader
                    src={post.thumbnail || "/images/default.png"}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                />
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

                    <footer className="flex items-center justify-start gap-2">
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
