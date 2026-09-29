import { GetStaticProps } from "next";
import { filterPosts, type PostType } from "@entities/notion";
import { readCachedPosts } from "@entities/notion/lib/notion-cache";
import { PAGE_SEO, personJsonLd } from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";
import {
    CareerSection,
    ContactSection,
    HeroSection,
    IntroSection,
    ProjectSection,
    WritingSection,
} from "@widgets/about-me";
import { AboutLayout } from "@widgets/layouts";

const RECENT_POST_LIMIT = 6;

const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    inLanguage: "ko-KR",
    mainEntity: personJsonLd,
};

interface AboutMePageProps {
    recentPosts: PostType[];
}

export default function AboutMePage({ recentPosts }: AboutMePageProps) {
    return (
        <>
            <SeoHead {...PAGE_SEO.about} type="profile" jsonLd={aboutJsonLd} />
            <AboutLayout>
                <HeroSection />
                <main>
                    <IntroSection />
                    <CareerSection />
                    <ProjectSection />
                    <WritingSection posts={recentPosts} />
                    <ContactSection />
                </main>
            </AboutLayout>
        </>
    );
}

export const getStaticProps: GetStaticProps<AboutMePageProps> = async () => {
    const recentPosts = filterPosts(readCachedPosts()).slice(
        0,
        RECENT_POST_LIMIT
    );

    return { props: { recentPosts } };
};
