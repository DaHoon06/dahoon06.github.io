import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@shared/routes";
import { type Project, type ProjectDetail as Detail } from "../model";
import { Container, Eyebrow, SplitLayout } from "./layout";
import { Reveal } from "./motion";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectDetailProps {
    project: Project;
    detail: Detail;
    index: number;
    total: number;
    prev?: Project;
    next?: Project;
}

/** 좌측 섹션 제목 + 우측 본문 */
const DetailBlock = ({
    eyebrow,
    title,
    children,
}: {
    eyebrow: string;
    title: string;
    children: ReactNode;
}) => (
    <Reveal>
        <section className="border-t border-white/10 py-16 md:py-24">
            <SplitLayout
                aside={
                    <>
                        <Eyebrow>{eyebrow}</Eyebrow>
                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
                            {title}
                        </h2>
                    </>
                }
            >
                {children}
            </SplitLayout>
        </section>
    </Reveal>
);

/** 프로젝트 상세 — 히어로 · 지표 · 개요 · 주요 기여 · 문제 해결 · 기술 · 회고 · 이전/다음 */
export const ProjectDetail = ({
    project,
    detail,
    index,
    total,
    prev,
    next,
}: ProjectDetailProps) => (
    <main className="pt-28 md:pt-36">
        <Container>
            <Link
                href={ROUTES.ABOUT_PROJECTS}
                className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
                <ArrowLeft
                    size={14}
                    className="transition-transform group-hover:-translate-x-0.5"
                />
                Projects
            </Link>

            {/* 히어로 */}
            <Reveal delay={0.1}>
                <header className="mt-10 md:mt-14">
                    <p className="text-sm text-zinc-500">
                        <span className="text-white">
                            {String(index + 1).padStart(2, "0")}
                        </span>{" "}
                        / {String(total).padStart(2, "0")} · {project.company}
                    </p>
                    <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                        {project.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                        {detail.summary}
                    </p>

                    <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 text-sm md:grid-cols-4">
                        {[
                            ["회사", project.company],
                            ["역할", project.role],
                            ["기간", project.period],
                        ]
                            .filter(([, v]) => v)
                            .map(([k, v]) => (
                                <div key={k}>
                                    <dt className="text-zinc-500">{k}</dt>
                                    <dd className="mt-1 text-zinc-200">{v}</dd>
                                </div>
                            ))}
                        {project.link && (
                            <div>
                                <dt className="text-zinc-500">링크</dt>
                                <dd className="mt-1">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-1 text-white hover:underline"
                                    >
                                        사이트 방문
                                        <ArrowUpRight size={13} />
                                    </a>
                                </dd>
                            </div>
                        )}
                    </dl>
                </header>
            </Reveal>

            <Reveal delay={0.2}>
                <ProjectPreview
                    project={project}
                    className="mt-14 aspect-[16/9] md:mt-20"
                />
            </Reveal>

            {/* 핵심 지표 */}
            <Reveal>
                <ul className="grid grid-cols-1 gap-px overflow-hidden bg-white/10 py-px my-16 sm:grid-cols-3 md:my-24">
                    {detail.metrics.map((m) => (
                        <li key={m.label} className="bg-[#161616] py-8 sm:px-6">
                            <p className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                                {m.value}
                            </p>
                            <p className="mt-2 text-sm text-zinc-500">
                                {m.label}
                            </p>
                        </li>
                    ))}
                </ul>
            </Reveal>

            <DetailBlock eyebrow="01" title="Overview">
                <div className="space-y-5 text-[15px] leading-relaxed text-zinc-300 md:text-base">
                    {detail.overview.map((p) => (
                        <p key={p}>{p}</p>
                    ))}
                </div>
            </DetailBlock>

            <DetailBlock eyebrow="02" title="What I did">
                <ol className="space-y-10">
                    {detail.highlights.map((h, i) => (
                        <li key={h.title} className="flex gap-5">
                            <span className="pt-1 text-sm text-zinc-500 tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {h.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">
                                    {h.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </DetailBlock>

            <DetailBlock eyebrow="03" title="Problem Solving">
                <div className="space-y-8">
                    {detail.challenges.map((c) => (
                        <dl
                            key={c.problem}
                            className="space-y-5 border border-white/10 p-6 text-[15px] leading-relaxed md:p-8"
                        >
                            {[
                                ["문제", c.problem],
                                ["해결", c.solution],
                            ].map(([k, v]) => (
                                <div key={k} className="flex gap-5">
                                    <dt className="w-10 shrink-0 text-zinc-500">
                                        {k}
                                    </dt>
                                    <dd className="text-zinc-300">{v}</dd>
                                </div>
                            ))}
                            <div className="flex gap-5 border-t border-white/10 pt-5">
                                <dt className="w-10 shrink-0 text-zinc-500">
                                    결과
                                </dt>
                                <dd className="font-semibold text-primary-000">
                                    {c.result}
                                </dd>
                            </div>
                        </dl>
                    ))}
                </div>
            </DetailBlock>

            <DetailBlock eyebrow="04" title="Tech Stack">
                <div className="space-y-4">
                    {project.techs.map((group) => (
                        <div
                            key={group.type}
                            className="flex flex-col gap-3 sm:flex-row sm:gap-6"
                        >
                            <span className="w-20 shrink-0 pt-1 text-sm text-zinc-500">
                                {group.type}
                            </span>
                            <ul className="flex flex-wrap gap-2">
                                {group.stacks.map((s) => (
                                    <li
                                        key={s}
                                        className="border border-white/15 px-3 py-1 text-sm text-zinc-200"
                                    >
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </DetailBlock>

            <DetailBlock eyebrow="05" title="Retrospective">
                <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">
                    {detail.retrospective}
                </p>
            </DetailBlock>

            {/* 이전 / 다음 프로젝트 — 앞 장은 되돌려 넘기고, 뒷 장은 앞으로 넘긴다 */}
            <nav className="grid grid-cols-1 gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2">
                {prev ? (
                    <Link
                        href={ROUTES.ABOUT_PROJECT(prev.slug)}
                        className="group bg-[#161616] py-10 sm:pr-8"
                    >
                        <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                            <ArrowLeft size={14} /> 이전 프로젝트
                        </span>
                        <p className="mt-3 text-xl font-bold text-white transition-opacity group-hover:opacity-70 md:text-2xl">
                            {prev.title}
                        </p>
                    </Link>
                ) : (
                    <div className="hidden bg-[#161616] sm:block" />
                )}
                {next && (
                    <Link
                        href={ROUTES.ABOUT_PROJECT(next.slug)}
                        className="group bg-[#161616] py-10 text-right sm:pl-8"
                    >
                        <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                            다음 프로젝트 <ArrowRight size={14} />
                        </span>
                        <p className="mt-3 text-xl font-bold text-white transition-opacity group-hover:opacity-70 md:text-2xl">
                            {next.title}
                        </p>
                    </Link>
                )}
            </nav>
            <div className="h-24 md:h-40" />
        </Container>
    </main>
);
