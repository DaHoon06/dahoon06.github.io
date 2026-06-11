import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { PostList } from "./PostList";
import { Search } from "lucide-react";
import usePostsQuery from "../model/use-posts-query";
import { useRouter } from "next/router";
import { ROUTES } from "@shared/routes";
import cn from "@shared/lib/cn";

type Item = { category?: string[] | null };

export const PostListRenderer = (): ReactElement => {
    const [inputKeyword, setInputKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const data = usePostsQuery();
    const router = useRouter();

    const [filteredPosts, setFilteredPosts] = useState(data);

    const currentTag = `${router.query.tag || ""}` || undefined;
    const currentCategory = `${router.query.category || ""}` || "All";
    const currentOrder = `${router.query.order || ""}` || "desc";

    useEffect(() => {
        setFilteredPosts(() => {
            let result = [...data];

            if (searchKeyword) {
                result = result.filter((post) => {
                    const tagContent = post.tags ? post.tags.join(" ") : "";
                    const content = post.title + (post.summary ?? "") + tagContent;
                    return content.toLowerCase().includes(searchKeyword.toLowerCase());
                });
            }
            if (currentTag) {
                result = result.filter((post) => post.tags?.includes(currentTag));
            }
            if (currentCategory !== "All") {
                result = result.filter((post) => post.category?.includes(currentCategory));
            }
            if (currentOrder !== "desc") {
                result = result.reverse();
            }

            return result;
        });
    }, [data, searchKeyword, currentTag, currentCategory, currentOrder]);

    const allCategories = (items: Item[]) =>
        Array.from(new Set(items.flatMap((item) => item.category ?? [])));

    const handleSearch = useCallback(() => {
        setSearchKeyword(inputKeyword);
        setInputKeyword("");
    }, [inputKeyword]);

    const handleCategoryClick = useCallback(
        (category: string) => {
            router.push(ROUTES.POSTS_WITH_CATEGORY(category));
        },
        [router],
    );

    const mainPost = useMemo(() => filteredPosts[0] ?? null, [filteredPosts]);
    const otherPosts = useMemo(() => filteredPosts.slice(1), [filteredPosts]);
    const categories = ["All", ...allCategories(data)];

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-zinc-800">블로그</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        총 {data.length}개의 포스트
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
                <input
                    type="text"
                    placeholder="제목, 내용, 태그로 검색..."
                    className="w-full bg-white border border-zinc-200 rounded-lg py-2.5 pl-9 pr-[52px] text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
                    value={inputKeyword}
                    onChange={(e) => setInputKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-0 top-0 h-full px-4 bg-[#111] text-white rounded-r-lg text-xs font-medium hover:bg-zinc-800 transition-colors"
                >
                    검색
                </button>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => {
                    const isActive = currentCategory === cat;
                    const label = cat === "All" ? "전체" : cat;
                    return (
                        <button
                            key={cat}
                            onClick={() =>
                                cat === "All"
                                    ? router.push(ROUTES.POSTS)
                                    : handleCategoryClick(cat)
                            }
                            className={cn(
                                "px-3 py-1.5 rounded-md text-xs font-medium border transition-all",
                                isActive
                                    ? "bg-[#111] text-white border-[#111]"
                                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-800",
                            )}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Empty state */}
            {!filteredPosts.length && (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                    <p className="text-4xl mb-3">😺</p>
                    <p className="text-sm font-medium">포스트가 없습니다.</p>
                </div>
            )}

            {/* Post list */}
            {filteredPosts.length > 0 && (
                <PostList mainPost={mainPost} otherPosts={otherPosts} />
            )}
        </div>
    );
};
