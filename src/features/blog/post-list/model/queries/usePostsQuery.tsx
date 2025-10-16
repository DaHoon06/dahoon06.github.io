import { filterPosts } from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { PostType } from "@entities/notion/types";
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
