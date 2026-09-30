import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@shared/routes";
import { PageTurnLink, type PageTurnLabel } from "@shared/ui/page-turn";
import { type Project, projectsData } from "../model";
import { ProjectPreview } from "./ProjectPreview";
import { Container, SectionTitle } from "./layout";
import { Reveal } from "./motion";

/** 한 프로젝트 — 좌측 프리뷰, 우측 개요·역할·기술 스택 */
const ProjectRow = ({
    project,
    index,
}: {
    project: Project;
    index: number;
}) => {
    const href = ROUTES.ABOUT_PROJECT(project.slug);
    const label: PageTurnLabel = {
        eyebrow: `${String(index + 1).padStart(2, "0")} — ${project.company}`,
        title: project.title,
    };

    return (
        <article className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
            <div>
                <PageTurnLink
                    href={href}
                    label={label}
                    aria-label={`${project.title} 상세 보기`}
                    className="group block"
                >
                    <ProjectPreview
                        project={project}
                        className="transition-transform duration-500 group-hover:scale-[0.985]"
                    />
                </PageTurnLink>
                <p className="mt-4 text-sm text-zinc-500">
                    <span className="text-2xl text-white">{index + 1}</span> /{" "}
                    {projectsData.length}
                </p>
            </div>

            <div className="md:pt-6">
                <p className="text-sm text-zinc-400">{project.company}</p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                    <PageTurnLink
                        href={href}
                        label={label}
                        className="transition-opacity hover:opacity-70"
                    >
                        {project.title}
                    </PageTurnLink>
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-zinc-300">
                    {project.description}
                </p>

                <dl className="mt-8 space-y-2 text-sm">
                    {project.role && (
                        <div className="flex gap-4">
                            <dt className="w-16 shrink-0 text-zinc-500">
                                역할
                            </dt>
                            <dd className="text-zinc-200">{project.role}</dd>
                        </div>
                    )}
                    {project.period && (
                        <div className="flex gap-4">
                            <dt className="w-16 shrink-0 text-zinc-500">
                                기간
                            </dt>
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

                <div className="mt-8 flex flex-wrap items-center gap-6">
                    <PageTurnLink
                        href={href}
                        label={label}
                        className="group inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                    >
                        자세히 보기
                        <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-0.5"
                        />
                    </PageTurnLink>
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 border-b border-white/40 pb-0.5 text-sm text-white transition-colors hover:border-white"
                        >
                            사이트 방문
                            <ArrowUpRight
                                size={14}
                                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

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
