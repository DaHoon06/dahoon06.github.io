import { useEffect, useState } from "react";
import Image from "next/image";
import cn from "@shared/lib/cn";
import type { Project } from "../model";

/** 이미지가 여러 장이면 자동 순환하는 프리뷰 영역 */
export const ProjectPreview = ({
    project,
    className,
}: {
    project: Project;
    className?: string;
}) => {
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
        <div
            className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg bg-[#202020]",
                className
            )}
        >
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
