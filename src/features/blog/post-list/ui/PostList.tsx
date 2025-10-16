import { ReactElement, memo } from "react";
import Link from "next/link";
import { PostCard, BannerCard } from "@entities/blog/ui";
import { PostType } from "@entities/notion/types";

interface PostListProps {
    mainPost: PostType | null;
    otherPosts: PostType[];
}

export const PostList = memo(
    ({ mainPost, otherPosts }: PostListProps): ReactElement => {
        return (
            <div className="flex flex-col gap-10">
                {mainPost && (
                    <Link href={`/posts/${mainPost.slug}`}>
                        <BannerCard post={mainPost} />
                    </Link>
                )}

                <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {otherPosts.map((post, index) => (
                        <Link
                            href={`/posts/${post.slug}`}
                            key={`${post.id}_${post.slug}`}
                            style={{
                                animationDelay: `${index * 40}ms`,
                            }}
                        >
                            <PostCard post={post} />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
);

PostList.displayName = "PostList";
