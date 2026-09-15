import { ReactElement, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePostsQuery, useTagsQuery } from "@features/blog/post-list";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";

const RECOMMEND_COUNT = 3;

export const BlogSideNav = (): ReactElement => {
    const router = useRouter();
    const posts = usePostsQuery();
    const tags = useTagsQuery();

    const currentTag = `${router.query.tag ?? ""}` || undefined;

    // 글이 많이 달린 태그 순으로 정렬
    const tagNames = useMemo(
        () => Object.keys(tags).sort((a, b) => (tags[b] ?? 0) - (tags[a] ?? 0)),
        [tags]
    );
    const recommendedPosts = useMemo(
        () => posts.slice(0, RECOMMEND_COUNT),
        [posts]
    );

    return (
        <div className="space-y-8">
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
                                        pathname: router.pathname,
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

            {/* 추천 글 */}
            {recommendedPosts.length > 0 && (
                <section className="rounded-2xl bg-zinc-50 p-5">
                    <h2 className="mb-4 text-[13px] font-semibold tracking-tight text-zinc-900">
                        추천 글
                    </h2>
                    <ol className="space-y-4">
                        {recommendedPosts.map((post, index) => (
                            <li key={`${post.id}_${post.slug}`}>
                                <Link
                                    href={ROUTES.POST(post.slug)}
                                    className="group flex gap-3"
                                >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-zinc-400 transition-colors group-hover:text-[#ff7337]">
                                        {index + 1}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="line-clamp-2 text-[13px] font-semibold leading-snug text-zinc-800 transition-colors group-hover:text-[#ff7337]">
                                            {post.title}
                                        </span>
                                        {post.summary && (
                                            <span className="mt-1 block truncate text-xs text-zinc-400">
                                                {post.summary}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </section>
            )}
        </div>
    );
};
