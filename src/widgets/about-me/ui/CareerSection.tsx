import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaBriefcase, FaSchool } from "react-icons/fa6";
import { careerData } from "../model";
import { Reveal, SectionHeading } from "./motion";

/** 스크롤에 따라 세로 라인이 그려지는 경력 타임라인 */
export const CareerSection = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start 0.75", "end 0.55"],
    });
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 24,
    });

    return (
        <section className="mx-auto w-full max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
            <SectionHeading index="03" title="Career" />

            <div ref={trackRef} className="relative pl-10 md:pl-16">
                {/* 라인 트랙 + 진행 라인 */}
                <div className="absolute left-[7px] top-1 bottom-1 w-px bg-white/10 md:left-[9px]" />
                <motion.div
                    style={{ scaleY }}
                    className="absolute left-[7px] top-1 bottom-1 w-px origin-top bg-gradient-to-b from-[#c9cbf8] via-[#c9cbf8] to-[#7c80e0] md:left-[9px]"
                />

                <div className="flex flex-col gap-16 md:gap-24">
                    {careerData.map((item, i) => (
                        <Reveal key={`${item.title}-${i}`} delay={0.05}>
                            <div className="relative">
                                {/* 도트 */}
                                <span className="absolute -left-10 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[#c9cbf8]/60 bg-[#0e0e11] md:-left-16 md:h-[19px] md:w-[19px]">
                                    <span className="h-[5px] w-[5px] rounded-full bg-[#c9cbf8]" />
                                </span>

                                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
                                    <p className="shrink-0 text-sm font-semibold tracking-widest text-zinc-500 md:w-56 md:text-base">
                                        {item.period}
                                    </p>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-2xl font-black tracking-tight text-white md:text-4xl">
                                                {item.company || item.title}
                                            </h3>
                                            <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-zinc-400">
                                                {item.type === "career" ? (
                                                    <FaBriefcase className="h-3 w-3" />
                                                ) : (
                                                    <FaSchool className="h-3 w-3" />
                                                )}
                                                {item.type === "career"
                                                    ? "Career"
                                                    : "Education"}
                                            </span>
                                        </div>
                                        {item.company && (
                                            <p className="mt-1.5 text-sm font-semibold text-[#c9cbf8] md:text-base">
                                                {item.title}
                                            </p>
                                        )}
                                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                                            {item.description}
                                        </p>
                                        <p className="mt-2 text-xs tracking-widest text-zinc-600">
                                            {item.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
