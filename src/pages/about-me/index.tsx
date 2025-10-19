import CustomHead from "@shared/ui/heads/CustomHead";
import {
    AboutMeSection,
    CareerSection,
    ProfileSection,
    ProjectSection,
} from "@widgets/about-me/ui";
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
                <div className="flex flex-col w-full mx-auto">
                    <ProfileSection />
                    <AboutMeSection />
                    <CareerSection />
                    <ProjectSection />
                </div>
            </AboutLayout>
        </>
    );
}
