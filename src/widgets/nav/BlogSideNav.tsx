import { ReactElement, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTagsQuery } from "@features/blog/post-list";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";
import { ProfileCard } from "./ProfileCard";

export const BlogSideNav = (): ReactElement => {
    const router = useRouter();
    const tags = useTagsQuery();

    const currentTag = `${router.query.tag ?? ""}` || undefined;

    // 글이 많이 달린 태그 순으로 정렬
    const tagNames = useMemo(
        () => Object.keys(tags).sort((a, b) => (tags[b] ?? 0) - (tags[a] ?? 0)),
        [tags]
    );

    return (
        <div className="space-y-8">
            {/* 프로필 */}
            <ProfileCard />

            {/* 태그 */}
            {tagNames.length > 0 && (
                <section>
                    <h2 className="mb-3 text-[13px] font-semibold tracking-tight text-zinc-900">
                        태그
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                        {tagNames.map((tag) => {
                            const isActive = tag === currentTag;
                            return (
                                <Link
                                    key={tag}
                                    href={{
                                        // 홈에는 태그 필터 목록이 없으므로 항상 /posts 로 보낸다
                                        pathname: ROUTES.POSTS,
                                        query: isActive ? {} : { tag },
                                    }}
                                    className={cn(
                                        "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                                        isActive
                                            ? "bg-[#111] text-white"
                                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                                    )}
                                >
                                    #{tag}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};
