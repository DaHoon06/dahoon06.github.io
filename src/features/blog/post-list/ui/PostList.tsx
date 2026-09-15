import { ReactElement, memo } from "react";
import Link from "next/link";
import { PostListItem } from "@entities/blog";
import { PostType } from "@entities/notion";
import { ROUTES } from "@shared/routes";

interface PostListProps {
    posts: PostType[];
}

export const PostList = memo(({ posts }: PostListProps): ReactElement => {
    return (
        <div className="divide-y divide-zinc-100">
            {posts.map((post) => (
                <Link
                    key={`${post.id}_${post.slug}`}
                    href={ROUTES.POST(post.slug)}
                    className="block"
                >
                    <PostListItem post={post} />
                </Link>
            ))}
        </div>
    );
});

PostList.displayName = "PostList";
