import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { PostDetail, PostType } from "@entities/notion/types";
import { getRecordMap } from "@entities/notion/libs/getRecordMap";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getPosts } from "@entities/notion/libs/getPosts";
import { filterPosts } from "@entities/notion/libs/filterPosts";

const usePostQuery = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data } = useQuery<PostDetail>({
        queryKey: notionQueryKeys.post(`${slug}`),
        queryFn: async () => {
            const posts = await getPosts();
            const post = filterPosts(posts).find(
                (p) => p.slug === slug
            ) as PostType;
            const recordMap = await getRecordMap(slug as string);
            return {
                ...post,
                recordMap,
            };
        },
        enabled: !!slug,
    });

    return data;
};

export default usePostQuery;
