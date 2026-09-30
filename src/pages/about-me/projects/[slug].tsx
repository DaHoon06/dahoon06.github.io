import { GetStaticPaths, GetStaticProps } from "next";
import { ROUTES } from "@shared/routes";
import SeoHead from "@shared/ui/heads/SeoHead";
import {
    getProjectDetail,
    ProjectDetail,
    projectsData,
} from "@widgets/about-me";
import { AboutLayout } from "@widgets/layouts";

interface ProjectDetailPageProps {
    slug: string;
}

export default function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
    const index = projectsData.findIndex((p) => p.slug === slug);
    const project = projectsData[index];
    const detail = getProjectDetail(slug);
    if (!project || !detail) return null;

    return (
        <>
            <SeoHead
                title={`${project.title} — 프로젝트 상세`}
                description={detail.summary}
                path={ROUTES.ABOUT_PROJECT(slug)}
                keywords={project.techs.flatMap((t) => t.stacks).slice(0, 6)}
                // 목업 데이터 단계라 검색 노출을 막는다 — 실제 내용으로 교체하면 제거
                noindex
            />
            <AboutLayout sectionNav={false}>
                <ProjectDetail
                    project={project}
                    detail={detail}
                    index={index}
                    total={projectsData.length}
                    prev={projectsData[index - 1]}
                    next={projectsData[index + 1]}
                />
            </AboutLayout>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: projectsData
        .filter((p) => getProjectDetail(p.slug))
        .map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps<ProjectDetailPageProps> = async ({
    params,
}) => ({ props: { slug: String(params?.slug) } });
