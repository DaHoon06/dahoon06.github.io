import {
    filterPosts,
    FilterPostsOptions,
} from "@entities/notion/libs/filterPosts";
import { getRecordMap } from "@entities/notion/libs/getRecordMap";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { CONFIG } from "@root/site.config";
import { queryClient } from "@shared/libs/react-query";
import { NextPageWithLayout } from "@shared/types";
import CustomHead from "@shared/ui/heads/CustomHead";
import { dehydrate } from "@tanstack/react-query";
import CustomError from "@widgets/error/CustomError";
import { BaseLayout } from "@widgets/layouts";
import { GetStaticProps } from "next";
import usePostQuery from "@entities/blog/model/queries/usePostQuery";
import path from "path";
import fs from "fs";
import { PostDetail } from "@features/blog/post-detail/ui/PostDetail";
import { TableOfContents } from "@entities/blog/ui";

const cachedPosts = fs.readFileSync(
    path.join(process.cwd(), "posts/cachedPosts.json"),
    "utf8"
);

const posts = JSON.parse(cachedPosts);

const filter: FilterPostsOptions = {
    acceptStatus: ["Public", "PublicOnDetail"],
    acceptType: ["Paper", "Post", "Page"],
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

    const recordMap = await getRecordMap(postDetail.id);

    await queryClient.prefetchQuery({
        queryKey: notionQueryKeys.post(slug),
        queryFn: () => ({ ...postDetail, recordMap }),
    });

    return {
        props: { dehydratedState: dehydrate(queryClient) },
    };
};
