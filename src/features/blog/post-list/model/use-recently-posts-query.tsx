import { useQuery } from "@tanstack/react-query";
import { notionQueryKeys, getPosts, recentlyPosts } from "@entities/notion";
import { PostType } from "@entities/notion";

const useRecentlyPostsQuery = () => {
    const { data } = useQuery({
        queryKey: notionQueryKeys.recentlyPosts(),
        queryFn: async () => recentlyPosts(await getPosts(), 4),
        initialData: [] as PostType[],
        enabled: false,
    });

    if (!data) throw new Error("Posts data is not found");

    return data;
};

export default useRecentlyPostsQuery;
