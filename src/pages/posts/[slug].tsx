import {
    filterPosts,
    FilterPostsOptions,
    notionQueryKeys,
} from "@entities/notion";
import {
    readCachedPosts,
    readCachedRecordMap,
} from "@entities/notion/lib/notion-cache";
import { CONFIG } from "@root/site.config";
import { queryClient } from "@shared/lib/react-query";
import { NextPageWithLayout } from "@shared/types";
import SeoHead from "@shared/ui/heads/SeoHead";
import { dehydrate } from "@tanstack/react-query";
import { CustomError } from "@widgets/error";
import { BaseLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";
import usePostQuery from "@features/blog/post-detail/model/use-post-query";
import { PostDetail } from "@features/blog/post-detail/ui/PostDetail";
import { TableOfContents } from "@entities/blog";
import { buildArticleSeo } from "@features/blog/post-detail/lib/article-seo";

const posts = readCachedPosts();

const filter: FilterPostsOptions = {
    acceptStatus: ["Public", "PublicOnDetail"],
    acceptType: ["Paper", "Post", "Page"],
};

const BlogPostDetailPage: NextPageWithLayout = () => {
    const post = usePostQuery();

    if (!post) return <CustomError />;

    const seo = buildArticleSeo(post, { basePath: "/posts", name: "블로그" });

    return (
        <>
            <SeoHead {...seo} />
            <BaseLayout>
                <PostDetail />
                <TableOfContents />
            </BaseLayout>
        </>
    );
};

export default BlogPostDetailPage;

export const getStaticPaths = async () => {
    const filteredPost = filterPosts(posts, filter);

    return {
        paths: filteredPost.map((post) => `/posts/${post.slug}`),
        fallback: CONFIG.isProd,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug as string;
    const filtered = filterPosts(posts, filter);
    const postDetail = filtered.find((t) => t.slug === slug);

    if (!postDetail) {
        return { notFound: true };
    }

    const recordMap = readCachedRecordMap(postDetail.id);

    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.post(slug),
        queryFn: () => ({ ...postDetail, recordMap }),
    });

    return {
        props: { dehydratedState: dehydrate(queryClient) },
    };
};
