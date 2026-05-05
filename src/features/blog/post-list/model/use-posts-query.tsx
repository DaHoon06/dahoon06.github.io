import { filterPosts, getPosts, notionQueryKeys } from "@entities/notion";
import { PostType } from "@entities/notion";
import { useQuery } from "@tanstack/react-query";

const usePostsQuery = () => {
    const { data } = useQuery({
        queryKey: notionQueryKeys.posts(),
        queryFn: async () => filterPosts(await getPosts()),
        initialData: [] as PostType[],
        enabled: false,
    });

    if (!data) throw new Error("Posts data is not found");

    return data;
};

export default usePostsQuery;
