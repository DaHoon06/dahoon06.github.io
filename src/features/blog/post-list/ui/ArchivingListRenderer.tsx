import { ReactElement, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Search } from "lucide-react";
import { EmptyState } from "@shared/ui/empty-state";
import { ArchivingList } from "./ArchivingList";
import useArchivingsQuery from "../model/use-archivings-query";

export const ArchivingListRenderer = (): ReactElement => {
    const [keyword, setKeyword] = useState("");

    const archivings = useArchivingsQuery();
    const router = useRouter();

    const currentTag = `${router.query.tag ?? ""}` || undefined;

    const filteredPosts = useMemo(() => {
        const search = keyword.trim().toLowerCase();

        return archivings.filter((post) => {
            if (currentTag && !post.tags?.includes(currentTag)) return false;
            if (!search) return true;

            const content = [post.title, post.summary, post.tags?.join(" ")]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return content.includes(search);
        });
    }, [archivings, keyword, currentTag]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-[28px]">
                    아카이빙
                </h1>
                <p className="mt-2 text-sm text-zinc-500">
                    찾아본 것, 정리해 둔 것
                </p>
            </div>

            {/* 검색 */}
            <div className="relative">
                <Search
                    size={17}
                    className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400"
                />
                <input
                    type="text"
                    placeholder="제목, 요약, 내용으로 검색..."
                    className="w-full rounded-xl border border-zinc-200 bg-white py-3 pr-4 pl-11 text-sm text-zinc-800 transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            {/* 목록 헤더 */}
            <div className="mt-10 mb-6 flex items-baseline gap-2 border-b border-zinc-200 pb-4">
                <h2 className="text-lg font-bold tracking-tight text-zinc-900">
                    {currentTag ? `#${currentTag}` : "전체"}
                </h2>
                <span className="text-sm text-zinc-400">
                    {filteredPosts.length}개
                </span>
            </div>

            {filteredPosts.length > 0 ? (
                <ArchivingList posts={filteredPosts} />
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
                    title={`#${currentTag} 아카이빙은 아직 없어요`}
                    description="다른 태그에는 모아둔 게 있어요."
                >
                    <Link
                        href={{ pathname: router.pathname }}
                        className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                    >
                        전체 보기
                    </Link>
                </EmptyState>
            ) : (
                <EmptyState
                    title="아직 모아둔 게 없어요"
                    description="좋은 걸 발견하면 여기에 차곡차곡 쌓아둘게요."
                />
            )}
        </div>
    );
};
