import { skillsData, stackRatioData } from "../model";
import { Reveal } from "./motion";

const RATIO_TONES = ["bg-zinc-200", "bg-zinc-500", "bg-zinc-700"];
const RATIO_TEXT = ["text-black", "text-white", "text-white"];

/** 영역별 활용 비중 막대 + 범례 */
const StackRatioBar = () => (
    <div>
        <div className="flex justify-between text-xs text-zinc-500">
            <span>기술 스택 활용 비중</span>
            <span>100%</span>
        </div>
        <div className="mt-3 flex h-14 overflow-hidden rounded-lg bg-white/[0.04]">
            {stackRatioData.map((r, i) => (
                <div
                    key={r.label}
                    style={{ width: `${r.percent}%` }}
                    className={`flex flex-col items-center justify-center border-r border-[#161616] last:border-r-0 ${RATIO_TONES[i]} ${RATIO_TEXT[i]}`}
                >
                    {r.percent >= 20 && (
                        <>
                            <span className="text-xs font-medium">
                                {r.label}
                            </span>
                            <span className="text-[10px] font-bold">
                                {r.percent}%
                            </span>
                        </>
                    )}
                </div>
            ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            {stackRatioData.map((r, i) => (
                <li
                    key={r.label}
                    className="flex items-center gap-2 text-xs text-zinc-300"
                >
                    <span
                        className={`h-2.5 w-2.5 rounded-full ${RATIO_TONES[i]}`}
                    />
                    {r.label} {r.percent}%
                    <span className="text-zinc-500">({r.note})</span>
                </li>
            ))}
        </ul>
    </div>
);

/** 기술 스택 — 비중 막대 + 카테고리별 설명·칩 */
export const SkillsSection = () => (
    <div id="stack" className="scroll-mt-24 pt-28 md:pt-40">
        <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-white">
                Stack
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-zinc-400 md:text-base">
                프론트엔드를 중심으로 구조적인 설계와 렌더링 최적화에 집중하고,
                서비스 전체를 이해하기 위해 백엔드와 인프라까지 직접 다룹니다.
            </p>
        </Reveal>

        <Reveal className="mt-10">
            <StackRatioBar />
        </Reveal>

        <div className="mt-16 space-y-14 md:mt-20 md:space-y-16">
            {skillsData.map((category) => (
                <Reveal key={category.category}>
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                        {category.category}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                        {category.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                        {category.items.map((item) => (
                            <li
                                key={item}
                                className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-[13px] text-zinc-200"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            ))}
        </div>
    </div>
);
