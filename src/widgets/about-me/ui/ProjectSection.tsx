"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { type Project, projectsData } from "../model";

const ProjectCard = ({ project }: { project: Project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!project.images || project.images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [project.images]);

    const currentImage = project.images?.[currentImageIndex];

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
            {currentImage && (
                <div className="relative h-52 w-full bg-gray-100 overflow-hidden flex-shrink-0">
                    <Image
                        src={currentImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                    {project.images && project.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {project.images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                        idx === currentImageIndex
                                            ? "bg-white"
                                            : "bg-white/40"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <span className="text-xs text-gray-400 font-medium">
                            {project.company}
                        </span>
                        <h3 className="text-base font-semibold text-gray-900 mt-0.5">
                            {project.title}
                        </h3>
                    </div>
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <ExternalLink size={14} className="text-gray-500" />
                        </a>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {project.role && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">
                            {project.role}
                        </span>
                    )}
                    {project.period && (
                        <span className="text-xs text-gray-400">
                            {project.period}
                        </span>
                    )}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                    {project.description}
                </p>

                <div className="space-y-3 mt-auto">
                    {project.techs.map((group) => (
                        <div key={group.type}>
                            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                                {group.type}
                            </span>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {group.stacks.map((stack) => (
                                    <span
                                        key={stack}
                                        className="text-xs px-2 py-0.5 border border-gray-200 rounded-full text-gray-600 bg-gray-50"
                                    >
                                        {stack}
                                    </span>
                                ))}
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
        <section className="py-16 px-4 bg-gray-50 w-full">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="text-left text-lg mb-10 text-[#222] font-semibold">
                    Projects
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};
