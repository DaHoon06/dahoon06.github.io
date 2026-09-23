import { filterPosts, notionQueryKeys } from "@entities/notion";
import {
    readCachedArchiving,
    readCachedPosts,
} from "@entities/notion/lib/notion-cache";
import { queryClient } from "@shared/lib/react-query";
import {
    dehydrate,
    DehydratedState,
    HydrationBoundary,
} from "@tanstack/react-query";
import { GetStaticProps, NextPage } from "next";
import { CONFIG } from "@root/site.config";
import { BaseLayout } from "@widgets/layouts";
import { BlogSideNav, ProfileCard } from "@widgets/nav";
import { ArchivingShowcase, PostListRenderer } from "@features/blog/post-list";
import { PAGE_SEO, SITE, personJsonLd } from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";

const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: "Dahoon06",
    url: SITE.url,
    inLanguage: "ko-KR",
    description: PAGE_SEO.home.description,
    author: personJsonLd,
    publisher: personJsonLd,
};

interface HomePageProps {
    dehydratedState: DehydratedState;
}

const HomePage: NextPage<HomePageProps> = ({ dehydratedState }) => {
    return (
        <HydrationBoundary state={dehydratedState}>
            <SeoHead {...PAGE_SEO.home} rawTitle jsonLd={homeJsonLd} />
            <BaseLayout aside={<BlogSideNav />}>
                <h1 className="sr-only">
                    전다훈 개발 블로그 — 실무 아카이빙·개발 블로그·개발 도구
                </h1>
                {/* 우측 aside는 lg 이상에서만 보여서, 모바일에서는 목록 위에 둔다 */}
                <div className="mb-8 lg:hidden">
                    <ProfileCard />
                </div>
                <ArchivingShowcase />
                <PostListRenderer />
            </BaseLayout>
        </HydrationBoundary>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
    const posts = filterPosts(readCachedPosts());
    const archivings = readCachedArchiving();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: notionQueryKeys.posts(),
            queryFn: () => posts,
        }),
        queryClient.prefetchQuery({
            queryKey: notionQueryKeys.archivings(),
            queryFn: () => archivings,
        }),
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        ...(CONFIG.isProd ? { revalidate: 3600 } : {}),
    };
};
