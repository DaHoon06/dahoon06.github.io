import { getAllSelectItemsFromPosts } from "@entities/notion/libs/getAllSelectItemsFromPosts";
import usePostsQuery from "@features/blog/post-list/services/usePostsQuery";

export const useTagsQuery = () => {
    const posts = usePostsQuery();
    const tags = getAllSelectItemsFromPosts("tags", posts);

    return tags;
};
