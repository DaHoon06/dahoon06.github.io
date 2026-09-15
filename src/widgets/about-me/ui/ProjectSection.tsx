import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
import { type Project, projectsData } from "../model";
import { SectionHeading } from "./motion";

/** 이미지가 여러 장이면 자동 순환하는 프리뷰 영역 */
const ProjectPreview = ({ project }: { project: Project }) => {
    const [current, setCurrent] = useState(0);
    const images = project.images ?? [];

    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(
            () => setCurrent((prev) => (prev + 1) % images.length),
            2600
        );
        return () => clearInterval(timer);
    }, [images.length]);

    const currentImage = images[current];

    if (!currentImage) {
        // 이미지가 없는 프로젝트는 타이포 데코로 채운다
        return (
            <div className="relative flex h-full min-h-[220px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(201,203,248,0.18),transparent_60%)]">
                <span className="select-none text-[7rem] font-black leading-none text-white/[0.07] md:text-[11rem]">
                    {project.title.slice(0, 2)}
                </span>
            </div>
        );
    }

    return (
        <div className="relative h-full min-h-[220px] overflow-hidden bg-black/40">
            <Image
                src={currentImage}
                alt={project.title}
                fill
                className="object-cover"
            />
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                idx === current ? "bg-white" : "bg-white/30"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * 스티키 스태킹 카드 한 장.
 * 컨테이너 전체의 스크롤 진행률에서 자기 구간 이후를 잘라 써서,
 * 다음 카드가 덮으며 올라올수록 이전 카드가 살짝 축소되며 뒤로 물러난다.
 */
const StackCard = ({
    project,
    index,
    total,
    progress,
}: {
    project: Project;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) => {
    const targetScale = 1 - (total - 1 - index) * 0.05;
    const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

    return (
        <div
            className="sticky mb-16 md:mb-24"
            style={{ top: `calc(10vh + ${index * 26}px)` }}
        >
            <motion.article
                style={{ scale }}
                className="origin-top overflow-hidden rounded-3xl border border-white/10 bg-[#141419] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            >
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
                    <div className="flex flex-col gap-5 p-7 md:p-12">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-black tracking-widest text-[#c9cbf8]">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                                {project.company}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                                {project.title}
                            </h3>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                {project.role && (
                                    <span className="rounded-full border border-[#c9cbf8]/40 px-3 py-1 text-xs font-semibold text-[#c9cbf8]">
                                        {project.role}
                                    </span>
                                )}
                                {project.period && (
                                    <span className="text-xs tracking-wider text-zinc-500">
                                        {project.period}
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                            {project.description}
                        </p>

                        <div className="mt-auto space-y-3 pt-2">
                            {project.techs.map((group) => (
                                <div
                                    key={group.type}
                                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5"
                                >
                                    <span className="w-16 shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                                        {group.type}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {group.stacks.map((stack) => (
                                            <span
                                                key={stack}
                                                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-zinc-300"
                                            >
                                                {stack}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#c9cbf8]"
                            >
                                Visit site
                                <ExternalLink
                                    size={14}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        )}
                    </div>

                    <ProjectPreview project={project} />
                </div>
            </motion.article>
        </div>
    );
};

/** 카드가 쌓이며 넘어가는 스티키 스택 프로젝트 쇼케이스 */
export const ProjectSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section className="mx-auto w-full max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
            <SectionHeading
                index="04"
                title="Projects"
                sub="실서비스에서 부딪히며 만든 것들. 카드를 스크롤로 넘겨 보세요."
            />

            <div ref={containerRef}>
                {projectsData.map((project, i) => (
                    <StackCard
                        key={project.title}
                        project={project}
                        index={i}
                        total={projectsData.length}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
};
