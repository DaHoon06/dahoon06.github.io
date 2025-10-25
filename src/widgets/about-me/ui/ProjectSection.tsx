import Image from "next/image";
import { useState, useEffect } from "react";

const projects = [
    {
        title: "🚧 인스티즈 🚧",
        description: "-",
        company: "인스티즈",
        techs: [
            {
                type: "frontend",
                stacks: [
                    "Next.js",
                    "TypeScript",
                    "TailwindCSS",
                    "Chart.js",
                    "React-Query",
                    "Zustand",
                ],
            },
            {
                type: "backend",
                stacks: ["Django", "Python", "MySQL"],
            },
            {
                type: "etc",
                stacks: [
                    "Docker",
                    "AWS",
                    "Git",
                    "GitLab",
                    "CloudFlare",
                    "Nginx",
                ],
            },
        ],
        images: [],
    },
    {
        title: "아이차트(iChart)",
        description: "음원 순위 차트 서비스",
        company: "인스티즈",
        techs: [
            {
                type: "frontend",
                stacks: [
                    "Next.js",
                    "TypeScript",
                    "TailwindCSS",
                    "Chart.js",
                    "React-Query",
                    "Zustand",
                ],
            },
            {
                type: "backend",
                stacks: [
                    "Django",
                    "Celery",
                    "Python",
                    "MySQL",
                    "Redis",
                    "Scrapy",
                ],
            },
            {
                type: "etc",
                stacks: [
                    "Centry",
                    "Jest",
                    "Docker",
                    "AWS",
                    "Git",
                    "GitLab",
                    "CloudFlare",
                    "Nginx",
                ],
            },
        ],
        images: [],
    },
    {
        title: "유니서베이(Unisurvey)",
        description:
            "유니서베이는 누구나 손쉽게 설문을 만들고 관리, 배포 할 수 있습니다. 설문 진행 상황을 모니터링하고, 수집된 데이터 차트로 시각화하여 분석할 수 있는 B2B 및 B2C 기반 설문 제작 플랫폼",
        company: "피앰아이",
        techs: [
            {
                type: "frontend",
                stacks: [
                    "Next.js",
                    "TypeScript",
                    "Styled-components",
                    "React Query",
                    "Zustand",
                    "Vue2/3",
                ],
            },
            {
                type: "backend",
                stacks: ["NestJS", "TypeScript", "MongoDB"],
            },
            {
                type: "etc",
                stacks: ["Docker", "AWS", "Git", "GitHub", "Socket.io"],
            },
        ],
        images: [
            "/images/project/pmi/unisurvey-preview1.gif",
            "/images/project/pmi/unisurvey-preview2.gif",
        ],
        link: "https://unisurvey.co.kr",
    },

    {
        title: "백오피스 개발",
        description: "설문 템플릿 기반 관리 시스템 구축",
        company: "피앰아이",
        techs: [
            {
                type: "frontend",
                stacks: [
                    "Next.js",
                    "TypeScript",
                    "Styled-components",
                    "React Query",
                    "Zustand",
                    "Vue2/3",
                ],
            },
            {
                type: "backend",
                stacks: ["NestJS", "TypeScript", "MongoDB"],
            },
            {
                type: "etc",
                stacks: ["Docker", "AWS", "Git", "GitHub", "Socket.io"],
            },
        ],
        images: [],
    },
];

// 프로젝트 타입 정의
interface Project {
    title: string;
    description: string;
    company: string;
    techs: Array<{
        type: string;
        stacks: string[];
    }>;
    images?: string[];
    image?: string;
    link?: string;
}

// 개별 프로젝트 카드 컴포넌트
const ProjectCard = ({
    project,
    index,
}: {
    project: Project;
    index: number;
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (project.images && project.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex(
                    (prevIndex) =>
                        (prevIndex + 1) % (project.images?.length || 0)
                );
            }, 2500);

            return () => clearInterval(interval);
        }
    }, [project.images]);

    const currentImage = project.images
        ? project.images[currentImageIndex]
        : project.image;

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            {currentImage && (
                <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                        src={currentImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-opacity duration-500"
                    />

                    {project.images && project.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {project.images.map((_, imgIndex) => (
                                <div
                                    key={imgIndex}
                                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                        imgIndex === currentImageIndex
                                            ? "bg-white"
                                            : "bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
            {/* 내용 영역 */}
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    {project.description}
                </p>

                <div className="mt-4 space-y-3">
                    {project.techs.map((techGroup, groupIndex) => (
                        <div key={groupIndex} className="space-y-1">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                {techGroup.type}
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {techGroup.stacks
                                    .slice(0, 4)
                                    .map((stack, stackIndex) => (
                                        <span
                                            key={stackIndex}
                                            className="rounded-full border border-gray-300 bg-gray-50 px-2 py-0.5 text-xs text-gray-700"
                                        >
                                            {stack}
                                        </span>
                                    ))}
                                {techGroup.stacks.length > 4 && (
                                    <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
                                        +{techGroup.stacks.length - 4}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const ProjectSection = () => {
    return (
        <section className="py-10 px-4 bg-gray-50 w-full">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="text-left text-lg mb-10 text-[#222] font-semibold">
                    Projects
                </h2>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
