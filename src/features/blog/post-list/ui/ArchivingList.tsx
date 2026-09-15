import { ReactElement, memo } from "react";
import Link from "next/link";
import { PostType } from "@entities/notion";
import { ArchivingCard } from "@entities/blog";
import { ROUTES } from "@shared/routes";

interface ArchivingListProps {
    posts: PostType[];
}

export const ArchivingList = memo(
    ({ posts }: ArchivingListProps): ReactElement => {
        return (
            // CSS multi-column masonry — 카드 높이가 썸네일 비율·본문 길이에 따라 달라진다
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
                {posts.map((post) => (
                    <Link
                        href={ROUTES.ARCHIVING_DETAIL(post.slug)}
                        key={`${post.id}_${post.slug}`}
                        className="mb-5 block break-inside-avoid"
                    >
                        <ArchivingCard post={post} />
                    </Link>
                ))}
            </div>
        );
    }
);

ArchivingList.displayName = "ArchivingList";
