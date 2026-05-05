import {
    notionQueryKeys,
    PostDetail,
    PostType,
    getRecordMap,
    getPosts,
    filterPosts,
} from "@entities/notion";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

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
            const recordMap = await getRecordMap(post.id);
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
