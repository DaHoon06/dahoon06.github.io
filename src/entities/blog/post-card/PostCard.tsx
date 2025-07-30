import { ImageLoader } from "@shared/ui/images";
import { PostType } from "@entities/notion/types";
import { Author } from "../shared/ui/Author";
import { ReactElement } from "react";

interface PostCardProps {
    post: PostType;
}

export const PostCard = ({ post }: PostCardProps): ReactElement => {
    return (
        <article className="flex flex-col gap-2 rounded-md bg-white">
            <ImageLoader
                src={post.thumbnail || "/images/default.png"}
                alt={post.title}
                className=" w-full rounded-md object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-gray-800">
                    {post.title}
                </h3>

                <Author
                    profileImage={post.author?.[0]?.profile_photo || ""}
                    name={post.author?.[0]?.name || ""}
                />
            </div>
        </article>
    );
};
