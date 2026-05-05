import { getAllSelectItemsFromPosts } from "@entities/notion";
import usePostsQuery from "./use-posts-query";

export const useCategoriesQuery = () => {
    const posts = usePostsQuery();
    const categories = getAllSelectItemsFromPosts("category", posts);

    return {
        ["📂 All"]: posts.length,
        ...categories,
    };
};
