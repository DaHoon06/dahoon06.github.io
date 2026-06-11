import { ReactElement, memo } from "react";
import Link from "next/link";
import { PostCard, BannerCard } from "@entities/blog";
import { PostType } from "@entities/notion";
import { ROUTES } from "@shared/routes";

interface PostListProps {
    mainPost: PostType | null;
    otherPosts: PostType[];
}

export const PostList = memo(
    ({ mainPost, otherPosts }: PostListProps): ReactElement => {
        return (
            <div className="flex flex-col gap-6">
                {/* Featured post */}
                {mainPost && (
                    <Link href={ROUTES.POST(mainPost.slug)}>
                        <BannerCard post={mainPost} />
                    </Link>
                )}

                {/* Post grid */}
                {otherPosts.length > 0 && (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {otherPosts.map((post, index) => (
                            <Link
                                href={ROUTES.POST(post.slug)}
                                key={`${post.id}_${post.slug}`}
                                style={{ animationDelay: `${index * 40}ms` }}
                            >
                                <PostCard post={post} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    },
);

PostList.displayName = "PostList";
