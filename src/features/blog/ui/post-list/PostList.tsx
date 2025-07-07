import { ReactElement, useEffect, useState } from "react";
import usePostsQuery from "../../services/usePostsQuery";
import { useRouter } from "next/router";
import styles from "./PostList.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PostCard } from "@entities/blog/post-card";

interface PostListProps {
    keyword: string;
}

export const PostList = ({ keyword }: PostListProps): ReactElement => {
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
                return searchContent
                    .toLowerCase()
                    .includes(keyword.toLowerCase());
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
    }, [keyword, currentTag, currentCategory, currentOrder, setFilteredPosts]);

    return (
        <AnimatePresence>
            <motion.div className={styles.postList} layout>
                {!filteredPosts.length && (
                    <p className="text-gray-500 dark:text-gray-300">
                        Nothing! 😺
                    </p>
                )}
                {filteredPosts.map((post) => (
                    <motion.div key={post.id} layout>
                        <Link href={`/blog/${post.slug}`}>
                            <PostCard post={post} />
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
