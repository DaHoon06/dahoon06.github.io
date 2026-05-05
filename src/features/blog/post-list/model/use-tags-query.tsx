import { getAllSelectItemsFromPosts } from "@entities/notion";
import usePostsQuery from "./use-posts-query";

export const useTagsQuery = () => {
    const posts = usePostsQuery();
    const tags = getAllSelectItemsFromPosts("tags", posts);

    return tags;
};
