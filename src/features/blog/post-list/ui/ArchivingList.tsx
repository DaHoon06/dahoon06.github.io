import { ReactElement, memo } from "react";
import Link from "next/link";
import { PostType } from "@entities/notion";
import { ArchivingCard } from "@entities/blog/ui/ArchivingCard";
import { ROUTES } from "@shared/routes";

interface ArchivingListProps {
    posts: PostType[];
}

export const ArchivingList = memo(
    ({ posts }: ArchivingListProps): ReactElement => {
        return (
            <div className="flex flex-col gap-10">
                <div className="grid gap-5 grid-cols-1">
                    {posts.map((post, index) => (
                        <Link
                            href={ROUTES.ARCHIVING_DETAIL(post.slug)}
                            key={`${post.id}_${post.slug}`}
                            style={{
                                animationDelay: `${index * 40}ms`,
                            }}
                        >
                            <ArchivingCard post={post} />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
);

ArchivingList.displayName = "ArchivingList";
