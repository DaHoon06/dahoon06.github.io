import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { PostList } from "./PostList";
import { IoSearchOutline } from "react-icons/io5";
import { usePostsQuery } from "../model/queries";
import { useRouter } from "next/router";

type Item = { category?: string[] | null };

export const PostListRenderer = (): ReactElement => {
    const [inputKeyword, setInputKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const data = usePostsQuery();
    const router = useRouter();

    const [filteredPosts, setFilteredPosts] = useState(data);

    const currentTag = `${router.query.tag || ``}` || undefined;
    const currentCategory = `${router.query.category || ``}` || "📂 All";
    const currentOrder = `${router.query.order || ``}` || "desc";

    useEffect(() => {
        setFilteredPosts(() => {
            let newFilteredPosts = data;
            // keyword
            newFilteredPosts = newFilteredPosts.filter((post) => {
                const tagContent = post.tags ? post.tags.join(" ") : "";
                const searchContent = post.title + post.summary + tagContent;
                return searchContent
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase());
            });

            // tag
            if (currentTag) {
                newFilteredPosts = newFilteredPosts.filter(
                    (post) =>
                        post && post.tags && post.tags.includes(currentTag)
                );
            }

            // category
            if (currentCategory !== "📂 All") {
                newFilteredPosts = newFilteredPosts.filter(
                    (post) =>
                        post &&
                        post.category &&
                        post.category.includes(currentCategory)
                );
            }
            // order
            if (currentOrder !== "desc") {
                newFilteredPosts = newFilteredPosts.reverse();
            }

            return newFilteredPosts;
        });
    }, [
        data,
        searchKeyword,
        currentTag,
        currentCategory,
        currentOrder,
        setFilteredPosts,
    ]);

    const allCategories = (data: Item[]) =>
        Array.from(new Set(data.flatMap((item) => item.category ?? [])));

    const handleSearch = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>): void => {
            e.preventDefault();
            setSearchKeyword(inputKeyword);
            setInputKeyword("");
        },
        [inputKeyword]
    );

    const mainPost = useMemo(() => {
        return filteredPosts[0] ?? null;
    }, [filteredPosts]);

    const otherPosts = useMemo(() => {
        return filteredPosts.slice(1) ?? [];
    }, [filteredPosts]);

    const handleCategoryClick = useCallback(
        (category: string) => {
            router.push(`/?category=${category}`);
        },
        [router]
    );

    return (
        <div className="flex flex-col md:gap-10 gap-4 p-4 pb-10 transition-all duration-300 ease-in-out motion-reduce:transition-none">
            <header className="flex flex-col w-full md:my-8 my-4 gap-4 transition-all duration-300 ease-in-out motion-reduce:transition-none">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-md border border-gray-200 p-2 pl-4 pr-14 text-sm text-gray-700 focus:border-primary-000 focus:outline-none"
                        value={inputKeyword}
                        onChange={(e) => setInputKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch(e);
                            }
                        }}
                    />
                    <button className="bg-[#222] flex justify-center items-center text-white rounded-r-md w-[48px] h-[38px] p-2 absolute right-0 top-1/2 -translate-y-1/2 ">
                        <IoSearchOutline size={22} color="#fff" />
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2">
                    {["📂 All", ...allCategories(data)].map((category) => {
                        const isActive = currentCategory === category;
                        const label = category === "📂 All" ? "전체" : category;
                        const baseClass =
                            "px-5 py-2 rounded-full text-[14px] border transition-colors";
                        const activeClass =
                            "bg-[#0B0B17] text-white border-[#0B0B17]";
                        const inactiveClass =
                            "bg-white text-gray-800 border-gray-200 hover:border-gray-300 hover:bg-gray-50";

                        return (
                            <button
                                key={category}
                                className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
                                onClick={() =>
                                    category === "📂 All"
                                        ? router.push("/")
                                        : handleCategoryClick(category)
                                }
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </header>

            {!filteredPosts.length && (
                <div className="flex flex-col items-center justify-center mt-10">
                    <p className="text-gray-500 dark:text-gray-300">
                        Nothing! 😺
                    </p>
                </div>
            )}

            <PostList mainPost={mainPost} otherPosts={otherPosts} />
        </div>
    );
};
