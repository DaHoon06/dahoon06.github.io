import { ReactElement, useEffect, useState } from "react";
import usePostsQuery from "../services/usePostsQuery";
import { useRouter } from "next/router";
import { PostCard } from "@entities/blog/ui/PostCard";

interface PostListProps {
    q: string;
}

export const PostList = ({ q }: PostListProps): ReactElement => {
    const router = useRouter();
    const data = usePostsQuery();
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
                return searchContent.toLowerCase().includes(q.toLowerCase());
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
    }, [q, currentTag, currentCategory, currentOrder, setFilteredPosts]);

    return (
        <div>
            {!filteredPosts.length && (
                <p className="text-gray-500 dark:text-gray-300">Nothing! 😺</p>
            )}
            {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};
