import { PAGE_SEO, personJsonLd } from "@shared/config/seo";
import SeoHead from "@shared/ui/heads/SeoHead";
import {
    CareerSection,
    ContactSection,
    HeroSection,
    IntroSection,
    ProjectSection,
    SkillsSection,
} from "@widgets/about-me";
import { AboutLayout } from "@widgets/layouts";

const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    inLanguage: "ko-KR",
    mainEntity: personJsonLd,
};

export default function AboutMePage() {

    return (
        <>
            <SeoHead {...PAGE_SEO.about} type="profile" jsonLd={aboutJsonLd} />
            <AboutLayout>
                {/* 고정 히어로 (z-0) — 아래 main(z-10)이 스크롤과 함께 덮으며 올라온다 */}
                <HeroSection />

                <main className="relative z-10 rounded-t-[2rem] bg-[#0e0e11] shadow-[0_-24px_60px_rgba(0,0,0,0.5)] md:rounded-t-[3rem]">
                    <IntroSection />
                    <SkillsSection />
                    <CareerSection />
                    <ProjectSection />
                    <ContactSection />
                </main>
            </AboutLayout>
        </>
    );
}
