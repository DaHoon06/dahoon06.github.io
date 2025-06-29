import usePostQuery from "@entities/blog/services/usePostQuery";
import { PostDetail } from "@features/blog/ui/post-detail/PostDetail";
import {
    filterPosts,
    FilterPostsOptions,
} from "@entities/notion/libs/filterPosts";
import { getPosts } from "@entities/notion/libs/getPosts";
import { getRecordMap } from "@entities/notion/libs/getRecordMap";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { CONFIG } from "@root/site.config";
import { queryClient } from "@shared/libs/react-query";
import { NextPageWithLayout } from "@shared/types";
import CustomHead from "@shared/ui/heads/CustomHead";
import { dehydrate } from "@tanstack/react-query";
import CustomError from "@widgets/error/CustomError";
import { BlogLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";

const filter: FilterPostsOptions = {
    acceptStatus: ["Public", "PublicOnDetail"],
    acceptType: ["Paper", "Post", "Page"],
};

export const getStaticPaths = async () => {
    const posts = await getPosts();
    const filteredPost = filterPosts(posts, filter);

    return {
        paths: filteredPost.map((post) => `/blog/${post.slug}`),
        fallback: CONFIG.isProd,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug;

    const posts = await getPosts();
    const feedPosts = filterPosts(posts);
    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.posts(),
        queryFn: () => feedPosts,
    });

    const detailPosts = filterPosts(posts, filter);
    const postDetail = detailPosts.find((t: any) => t.slug === slug);
    const recordMap = await getRecordMap(postDetail?.id!);

    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.post(`${slug}`),
        queryFn: () => ({
            ...postDetail,
            recordMap,
        }),
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: CONFIG.isProd ? CONFIG.revalidateTime : false,
    };
};

const BlogPostDetailPage: NextPageWithLayout = () => {
    const post = usePostQuery();

    if (!post) return <CustomError />;

    const image =
        post.thumbnail ??
        CONFIG.ogImageGenerateURL ??
        `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`;

    const date = post.date?.start_date || post.createdTime || "";

    const meta = {
        title: post.title,
        date: new Date(date).toISOString(),
        image: image,
        description: post.summary || "",
        type: post.type[0],
        url: `${CONFIG.link}/${post.slug}`,
    };

    return (
        <>
            <CustomHead {...meta} />
            <BlogLayout>
                <PostDetail />
            </BlogLayout>
        </>
    );
};

export default BlogPostDetailPage;
