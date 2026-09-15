import cn from "@shared/lib/cn";
import { skillsData } from "../model";
import { Reveal, SectionHeading } from "./motion";

/**
 * 무한 마퀴 한 줄. 트랙에 동일 콘텐츠 2벌을 두고 절반만큼 이동시켜 루프를 잇는다.
 * 호버 시 일시정지, 모션 축소 설정에선 애니메이션 자체를 끈다.
 */
const MarqueeRow = ({
    label,
    items,
    reverse,
    duration,
}: {
    label: string;
    items: readonly string[];
    reverse?: boolean;
    duration: number;
}) => {
    const copy = (
        <div aria-hidden={reverse} className="flex items-center gap-10 pr-10">
            {items.map((item, i) => (
                <span key={item} className="flex items-center gap-10">
                    <span
                        className={cn(
                            "whitespace-nowrap text-4xl font-black tracking-tight md:text-6xl",
                            i % 2 === 0
                                ? "text-white"
                                : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)]"
                        )}
                    >
                        {item}
                    </span>
                    <span className="text-xl text-[#c9cbf8]">✦</span>
                </span>
            ))}
        </div>
    );

    return (
        <Reveal>
            <div className="border-t border-white/10 py-8 md:py-10">
                <p className="mb-5 px-6 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 md:px-10">
                    {label}
                </p>
                <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
                    <div
                        className="flex w-max group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
                        style={{
                            animation: `${reverse ? "pf-marquee-reverse" : "pf-marquee"} ${duration}s linear infinite`,
                        }}
                    >
                        {copy}
                        {copy}
                    </div>
                </div>
            </div>
        </Reveal>
    );
};

/** 카테고리별 대형 타이포 마퀴로 기술 스택을 훑는 섹션 */
export const SkillsSection = () => {
    return (
        <section className="w-full py-28 md:py-40">
            <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
                <SectionHeading
                    index="02"
                    title="Skills"
                    sub="자주 쓰고, 깊게 파고드는 도구들. 줄 위에 올려 두고 계속 갈아 끼웁니다."
                />
            </div>

            <div className="border-b border-white/10">
                {skillsData.map((category, i) => (
                    <MarqueeRow
                        key={category.category}
                        label={category.category}
                        items={category.items}
                        reverse={i % 2 === 1}
                        duration={36 + i * 6}
                    />
                ))}
            </div>
        </section>
    );
};
