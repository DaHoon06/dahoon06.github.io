import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type Project, projectsData } from "../model";
import { Container, SectionTitle } from "./layout";
import { Reveal } from "./motion";

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

    return (
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#202020]">
            {currentImage ? (
                <Image
                    src={currentImage}
                    alt={`${project.title} 미리보기`}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                />
            ) : (
                // 이미지가 없는 프로젝트는 모노톤 타이포 플레이스홀더로 채운다
                <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.08),transparent_60%)] p-7">
                    <span className="text-xs text-zinc-500">
                        {project.company}
                    </span>
                    <span className="text-3xl font-bold leading-tight tracking-tight text-white/80 md:text-4xl">
                        {project.title}
                    </span>
                </div>
            )}
        </div>
    );
};

/** 한 프로젝트 — 좌측 프리뷰, 우측 개요·역할·기술 스택 */
const ProjectRow = ({
    project,
    index,
}: {
    project: Project;
    index: number;
}) => (
    <article className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
        <div>
            <ProjectPreview project={project} />
            <p className="mt-4 text-sm text-zinc-500">
                <span className="text-2xl text-white">{index + 1}</span> /{" "}
                {projectsData.length}
            </p>
        </div>

        <div className="md:pt-6">
            <p className="text-sm text-zinc-400">{project.company}</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                {project.title}
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-zinc-300">
                {project.description}
            </p>

            <dl className="mt-8 space-y-2 text-sm">
                {project.role && (
                    <div className="flex gap-4">
                        <dt className="w-16 shrink-0 text-zinc-500">역할</dt>
                        <dd className="text-zinc-200">{project.role}</dd>
                    </div>
                )}
                {project.period && (
                    <div className="flex gap-4">
                        <dt className="w-16 shrink-0 text-zinc-500">기간</dt>
                        <dd className="text-zinc-200">{project.period}</dd>
                    </div>
                )}
            </dl>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {project.techs.map((group) => (
                    <div key={group.type} className="flex gap-4 text-sm">
                        <span className="w-16 shrink-0 text-zinc-500">
                            {group.type}
                        </span>
                        <span className="leading-relaxed text-zinc-300">
                            {group.stacks.join(" · ")}
                        </span>
                    </div>
                ))}
            </div>

            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-1.5 border-b border-white/40 pb-0.5 text-sm text-white transition-colors hover:border-white"
                >
                    사이트 방문
                    <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                </a>
            )}
        </div>
    </article>
);

/** 프로젝트 목록 — 스크롤만으로 모든 정보를 훑을 수 있게 세로로 나열한다 */
export const ProjectSection = () => (
    <section id="projects" className="scroll-mt-16 py-28 md:py-40">
        <Container>
            <Reveal>
                <SectionTitle
                    title="Projects"
                    lead="실서비스를 운영하며 만든 결과물들입니다. 무엇을 만들었는지, 어떤 역할로 어떤 기술을 썼는지 함께 정리했습니다."
                />
            </Reveal>

            <div className="space-y-24 md:space-y-32">
                {projectsData.map((project, i) => (
                    <Reveal key={project.title}>
                        <ProjectRow project={project} index={i} />
                    </Reveal>
                ))}
            </div>
        </Container>
    </section>
);
