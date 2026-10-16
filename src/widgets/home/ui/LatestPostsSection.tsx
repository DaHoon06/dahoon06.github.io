import { ReactElement, useMemo } from "react";
import { PostList, usePostsQuery } from "@features/blog/post-list";
import { ROUTES } from "@shared/routes";
import { HomeSectionHeader } from "./HomeSectionHeader";

const LATEST_LIMIT = 5;

/** 홈 — 최신 블로그 글 몇 개만. 검색·태그 필터·전체 목록은 /posts 가 맡는다 */
export const LatestPostsSection = (): ReactElement | null => {
    const posts = usePostsQuery();
    const latest = useMemo(() => posts.slice(0, LATEST_LIMIT), [posts]);

    if (latest.length === 0) return null;

    return (
        <section className="mb-12">
            <HomeSectionHeader
                title="최신 글"
                description={`블로그에 쌓인 글 ${posts.length}개 중 최근 글`}
                href={ROUTES.POSTS}
            />
            <div className="border-t border-zinc-200">
                <PostList posts={latest} />
            </div>
        </section>
    );
};
