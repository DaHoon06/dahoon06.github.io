import { ROUTES } from "@shared/routes";
import { profileData } from "../model";
import {
    Container,
    Eyebrow,
    Headline,
    OutlineButton,
    SplitLayout,
} from "./layout";
import { Reveal } from "./motion";
import { SkillsSection } from "./SkillsSection";

const HIGHLIGHTS = [
    {
        value: "2021 ~",
        desc: "B2B 설문 플랫폼 개발로 시작해, 현재 인스티즈에서 커뮤니티와 음원 차트 서비스를 개발하고 있습니다.",
    },
    {
        value: `${profileData.stats.projects}`,
        desc: "실서비스 운영 프로젝트부터 백오피스·크롤러까지, 기획부터 배포까지 직접 참여한 프로젝트입니다.",
    },
];

const VALUES = [
    {
        title: "사용자 중심",
        desc: "빠르고 직관적인 UI로 사용자가 헤매지 않는 경험을 최우선으로 개발합니다.",
    },
    {
        title: "코드 품질",
        desc: "팀이 오래 유지보수할 수 있도록 구조와 경계를 먼저 설계합니다.",
    },
    {
        title: "지속 성장",
        desc: "새로운 기술을 실험하고 블로그로 기록하며 지식을 공유합니다.",
    },
];

/** 인사말 + (좌측 sticky 소개) + 핵심 수치·가치관 + 기술 스택 */
export const IntroSection = () => (
    <section id="about" className="scroll-mt-16 py-28 md:py-40">
        <Container>
            <Reveal className="mb-16 md:mb-20">
                <Headline>
                    안녕하세요!
                    <br />
                    프론트엔드 개발자 {profileData.name}입니다.
                </Headline>
            </Reveal>

            <SplitLayout
                aside={
                    <Reveal>
                        <p className="text-[15px] leading-[1.8] text-zinc-400">
                            {profileData.bio.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </p>
                        <div className="mt-10">
                            <OutlineButton href={ROUTES.HOME}>
                                블로그 둘러보기
                            </OutlineButton>
                        </div>
                    </Reveal>
                }
            >
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10">
                    {HIGHLIGHTS.map((item, i) => (
                        <Reveal key={item.value} delay={i * 0.1}>
                            <Eyebrow>value 0{i + 1}</Eyebrow>
                            <p className="mt-2 text-5xl font-bold tracking-tight text-white">
                                {item.value}
                            </p>
                            <p className="mt-5 text-[15px] leading-relaxed text-zinc-400">
                                {item.desc}
                            </p>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:mt-28">
                    {VALUES.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.1}>
                            <Eyebrow>value 0{i + 1}</Eyebrow>
                            <h3 className="mt-3 text-lg font-bold text-white">
                                {item.title}
                            </h3>
                            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                                {item.desc}
                            </p>
                        </Reveal>
                    ))}
                </div>

                <SkillsSection />
            </SplitLayout>
        </Container>
    </section>
);
