import { ReactElement, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { EmptyState } from "@shared/ui/empty-state";
import { PostList } from "./PostList";
import usePostsQuery from "../model/use-posts-query";

interface PostListRendererProps {
    heading?: string;
    description?: string;
}

export const PostListRenderer = ({
    heading,
    description,
}: PostListRendererProps): ReactElement => {
    const [keyword, setKeyword] = useState("");

    const posts = usePostsQuery();
    const router = useRouter();

    const currentTag = `${router.query.tag ?? ""}` || undefined;

    const filteredPosts = useMemo(() => {
        const search = keyword.trim().toLowerCase();

        return posts.filter((post) => {
            if (currentTag && !post.tags?.includes(currentTag)) return false;
            if (!search) return true;

            const content = [post.title, post.summary, post.tags?.join(" ")]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return content.includes(search);
        });
    }, [posts, keyword, currentTag]);

    return (
        <div>
            {heading && (
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-[28px]">
                        {heading}
                    </h1>
                    {description && (
                        <p className="mt-2 text-sm text-zinc-500">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* 검색 */}
            <div className="relative">
                <Search
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                    type="text"
                    placeholder="제목, 요약, 내용으로 검색..."
                    className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm text-zinc-800 transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            {/* 선택된 태그 (우측 네비게이션이 숨겨지는 모바일에서도 해제할 수 있도록) */}
            {currentTag && (
                <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-full bg-[#111] px-2.5 py-1 text-xs font-medium text-white">
                        #{currentTag}
                    </span>
                    <Link
                        href={{ pathname: router.pathname }}
                        className="flex items-center gap-0.5 text-xs text-zinc-400 transition-colors hover:text-zinc-700"
                    >
                        <X size={12} />
                        필터 해제
                    </Link>
                </div>
            )}

            {/* 목록 헤더 */}
            <div className="mt-10 flex items-baseline gap-2 border-b border-zinc-200 pb-4">
                <h2 className="text-lg font-bold tracking-tight text-zinc-900">
                    {currentTag ? `#${currentTag}` : "최신 글"}
                </h2>
                <span className="text-sm text-zinc-400">
                    {filteredPosts.length}개
                </span>
            </div>

            {filteredPosts.length > 0 ? (
                <PostList posts={filteredPosts} />
            ) : keyword.trim() ? (
                <EmptyState
                    face="( ・ั﹏・ั )"
                    title={`"${keyword.trim()}" 검색 결과가 없어요`}
                    description="다른 단어로 한 번만 더 찾아볼까요?"
                >
                    <button
                        type="button"
                        onClick={() => setKeyword("")}
                        className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                    >
                        검색어 지우기
                    </button>
                </EmptyState>
            ) : currentTag ? (
                <EmptyState
                    face="( ˘ ᵕ ˘ )"
                    title={`#${currentTag} 글은 아직 없어요`}
                    description="다른 태그에는 글이 기다리고 있어요."
                >
                    <Link
                        href={{ pathname: router.pathname }}
                        className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                    >
                        전체 글 보기
                    </Link>
                </EmptyState>
            ) : (
                <EmptyState
                    title="아직 쓴 글이 없어요"
                    description="지금 열심히 쓰는 중이에요. 곧 들고 올게요!"
                />
            )}
        </div>
    );
};
