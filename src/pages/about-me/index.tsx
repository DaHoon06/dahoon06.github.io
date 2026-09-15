import CustomHead from "@shared/ui/heads/CustomHead";
import {
    CareerSection,
    ContactSection,
    HeroSection,
    IntroSection,
    ProjectSection,
    SkillsSection,
} from "@widgets/about-me";
import { AboutLayout } from "@widgets/layouts";

export default function AboutMePage() {
    const meta = {
        title: "전다훈 | About Me :: 포트폴리오",
        description: "프론트엔드 개발자 전다훈(Da-hoon Jeon)의 포트폴리오",
        url: "https://dahoon06.github.io/about-me",
        image: "/images/dahoon06.jpg",
        type: "website",
        keywords:
            "프론트엔드, 포트폴리오, 백엔드, 풀스택, 개발자, dahoon06, 훈다, 전다훈, dahoon226, dahoon06@gmail.com",
        author: "Da-hoon Jeon (dahoon06)",
        siteName: "전다훈 포트폴리오",
    };

    return (
        <>
            <CustomHead {...meta} />
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
