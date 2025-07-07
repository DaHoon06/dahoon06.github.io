import { getAllSelectItemsFromPosts } from "@entities/notion/libs/getAllSelectItemsFromPosts";
import usePostsQuery from "@features/blog/services/usePostsQuery";

export const useCategoriesQuery = () => {
    const posts = usePostsQuery();
    const categories = getAllSelectItemsFromPosts("category", posts);

    return {
        ["📂 All"]: posts.length,
        ...categories,
    };
};
