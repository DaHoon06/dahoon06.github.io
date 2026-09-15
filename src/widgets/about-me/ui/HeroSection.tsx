import { MouseEvent as ReactMouseEvent, useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from "framer-motion";
import { FaArrowDown, FaEnvelope, FaGithub } from "react-icons/fa6";
import { profileData } from "../model";
import { EASE_OUT, Magnetic } from "./motion";

const lineVariants = (delay: number): Variants => ({
    hidden: {},
    show: {
        transition: { staggerChildren: 0.04, delayChildren: delay },
    },
});

const charVariants: Variants = {
    hidden: { y: "115%", rotate: 5 },
    show: {
        y: "0%",
        rotate: 0,
        transition: { duration: 1, ease: [...EASE_OUT] },
    },
};

/** 한 줄을 글자 단위로 쪼개 아래에서 차오르듯 등장시키는 키네틱 타이포 라인 */
const KineticLine = ({
    text,
    delay,
    className,
}: {
    text: string;
    delay: number;
    className?: string;
}) => (
    <motion.span
        aria-label={text}
        role="heading"
        aria-level={1}
        className="block overflow-hidden pb-[0.08em]"
        variants={lineVariants(delay)}
        initial="hidden"
        animate="show"
    >
        {text.split("").map((char, i) => (
            <motion.span
                key={i}
                aria-hidden
                variants={charVariants}
                className={`inline-block will-change-transform ${className ?? ""}`}
            >
                {char === " " ? " " : char}
            </motion.span>
        ))}
    </motion.span>
);

/**
 * 고정(fixed) 인트로 히어로.
 *
 * 실제 문서 흐름에는 투명한 스페이서(h-[115vh])만 두고, 비주얼은 fixed 레이어에 그린다.
 * 뒤이어 오는 콘텐츠(main, z-10)가 스크롤과 함께 이 레이어를 "덮으며" 올라오고,
 * 그동안 히어로는 스크롤 진행률에 따라 축소·블러·페이드로 뒤로 물러난다.
 */
export const HeroSection = () => {
    const spacerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: spacerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const yShift = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
    const blur = useTransform(
        scrollYProgress,
        [0, 1],
        ["blur(0px)", "blur(10px)"]
    );

    // 마우스 팔로우 글로우 (% 좌표)
    const mx = useMotionValue(50);
    const my = useMotionValue(38);
    const gx = useSpring(mx, { stiffness: 60, damping: 20 });
    const gy = useSpring(my, { stiffness: 60, damping: 20 });
    const glow = useMotionTemplate`radial-gradient(640px circle at ${gx}% ${gy}%, rgba(201, 203, 248, 0.16), transparent 70%)`;

    // 타이포가 커서 반대 방향으로 살짝 밀리는 패럴랙스
    const px = useTransform(gx, [0, 100], [12, -12]);
    const py = useTransform(gy, [0, 100], [8, -8]);

    const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
        mx.set((e.clientX / window.innerWidth) * 100);
        my.set((e.clientY / window.innerHeight) * 100);
    };

    return (
        <>
            {/* 문서 흐름용 스페이서 — 100vh보다 조금 길게 잡아 히어로가 한 박자 머문다 */}
            <div ref={spacerRef} className="h-[115vh]" />

            <motion.section
                onMouseMove={handleMouseMove}
                style={
                    reduceMotion
                        ? undefined
                        : { opacity, scale, y: yShift, filter: blur }
                }
                className="fixed inset-0 z-0 flex flex-col justify-center overflow-hidden bg-[#08080b]"
            >
                {/* 그리드 배경 */}
                <div
                    aria-hidden
                    className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
                />
                {/* 마우스 팔로우 글로우 */}
                <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ backgroundImage: glow }}
                />

                <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
                    {/* 아이브로 */}
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.15,
                            ease: [...EASE_OUT],
                        }}
                        className="mb-6 flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.3em] text-zinc-400"
                    >
                        <span className="h-px w-10 bg-[#c9cbf8]" />
                        {profileData.nameEn.toUpperCase()} — PORTFOLIO
                    </motion.p>

                    {/* 키네틱 헤드라인 */}
                    <motion.div
                        style={reduceMotion ? undefined : { x: px, y: py }}
                        className="select-none text-[clamp(3.2rem,13vw,10.5rem)] font-black leading-[0.92] tracking-tight"
                    >
                        <KineticLine
                            text="FRONTEND"
                            delay={0.3}
                            className="text-white"
                        />
                        <KineticLine
                            text="DEVELOPER"
                            delay={0.55}
                            className="text-transparent [-webkit-text-stroke:1.5px_rgba(201,203,248,0.9)]"
                        />
                    </motion.div>

                    {/* 소개 문구 + 퀵 링크 */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 1.1,
                            ease: [...EASE_OUT],
                        }}
                        className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
                    >
                        <p className="max-w-md text-sm md:text-base leading-relaxed text-zinc-400">
                            더 나은 UI와 더 빠른 웹을 위해 디테일에 집착하는
                            <br />
                            프론트엔드 개발자{" "}
                            <strong className="font-semibold text-white">
                                {profileData.name}
                            </strong>
                            입니다.
                        </p>

                        <div className="flex items-center gap-3">
                            <Magnetic>
                                <a
                                    href={profileData.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-[#c9cbf8] hover:text-[#c9cbf8]"
                                >
                                    <FaGithub size={18} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a
                                    href={`mailto:${profileData.email}`}
                                    aria-label="Email"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-[#c9cbf8] hover:text-[#c9cbf8]"
                                >
                                    <FaEnvelope size={16} />
                                </a>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>

                {/* 스크롤 큐 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-zinc-500"
                >
                    <span className="text-[10px] font-semibold tracking-[0.35em]">
                        SCROLL
                    </span>
                    <motion.span
                        animate={
                            reduceMotion ? undefined : { y: [0, 8, 0] }
                        }
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <FaArrowDown size={12} />
                    </motion.span>
                </motion.div>
            </motion.section>
        </>
    );
};
