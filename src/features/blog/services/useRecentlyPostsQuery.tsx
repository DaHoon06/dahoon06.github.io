import { useQuery } from "@tanstack/react-query";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { getPosts } from "@entities/notion/libs/getPosts";
import { recentlyPosts } from "@entities/notion/libs/recentlyPosts";
import { PostType } from "@entities/notion/types";

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
