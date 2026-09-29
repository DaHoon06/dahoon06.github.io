import { motion } from "framer-motion";
import { careerData, profileData, projectsData } from "../model";
import { Container } from "./layout";
import { SocialLinks } from "./SocialLinks";
import { EASE_OUT } from "./motion";

const KEY_STACKS = ["Next.js", "React", "TypeScript", "NestJS"];

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [...EASE_OUT] },
});

/** 히어로 하단 요약 리스트 — 좌측 세로 라인 + 제목/보조 텍스트 */
const QuickList = ({
    title,
    href,
    items,
}: {
    title: string;
    href: string;
    items: { primary: string; secondary: string }[];
}) => (
    <div className="min-w-0">
        <a
            href={href}
            className="text-sm text-zinc-400 transition-colors hover:text-white"
        >
            {title} ›
        </a>
        <ul className="mt-5 space-y-4 border-l border-white/15 pl-4">
            {items.map((item) => (
                <li key={item.primary} className="min-w-0">
                    <p className="truncate text-[13px] text-white">
                        {item.primary}
                    </p>
                    <p className="mt-0.5 truncate text-[13px] text-zinc-500">
                        {item.secondary}
                    </p>
                </li>
            ))}
        </ul>
    </div>
);

/** 첫 화면 — 한 줄 정체성 + 핵심 스택 + 프로젝트/경력 요약 */
export const HeroSection = () => {
    const projects = projectsData.slice(0, 3).map((p) => ({
        primary: p.title,
        secondary: `${p.company} · ${p.period ?? ""}`,
    }));
    const careers = careerData
        .filter((c) => c.type === "career")
        .map((c) => ({
            primary: `${c.company} — ${c.title}`,
            secondary: c.period,
        }));

    return (
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#111]">
            {/* 모노톤 배경 — 상단 빛 번짐 + 도트 필드 */}
            <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(255,255,255,0.10),transparent_70%)]"
            />
            <div
                aria-hidden
                className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_70%_20%,black_10%,transparent_65%)]"
            />
            <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#161616]"
            />

            <Container className="relative flex flex-1 flex-col justify-center pt-28 pb-12 md:pt-24">
                <motion.p
                    {...fadeUp(0.1)}
                    className="text-lg text-zinc-200 md:text-xl"
                >
                    사용자 경험을 먼저 고민하는 개발자
                </motion.p>
                <motion.h1
                    {...fadeUp(0.2)}
                    className="mt-3 text-[clamp(2.75rem,8vw,5.25rem)] font-bold leading-[1.05] tracking-tight text-white"
                >
                    Front-end Developer
                </motion.h1>
                <motion.div {...fadeUp(0.35)} className="mt-10 md:mt-14">
                    <p className="text-[15px] text-zinc-200 md:text-base">
                        2021년부터 설문 플랫폼·커뮤니티·음원 차트 서비스를
                        만들어 온 프론트엔드 개발자 {profileData.name}입니다
                    </p>
                    <p className="mt-3 text-[15px] text-zinc-500 md:text-base">
                        {KEY_STACKS.join("  ·  ")}
                    </p>
                </motion.div>
            </Container>

            <Container className="relative pb-16">
                <motion.div
                    {...fadeUp(0.5)}
                    className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_250px_250px] md:gap-12"
                >
                    <div className="order-last md:order-none md:self-start">
                        <SocialLinks />
                    </div>
                    <QuickList
                        title="Projects"
                        href="#projects"
                        items={projects}
                    />
                    <QuickList title="Career" href="#career" items={careers} />
                </motion.div>
            </Container>
        </section>
    );
};
