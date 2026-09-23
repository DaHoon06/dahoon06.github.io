import { type CareerItem, careerData } from "../model";
import { Container, SectionTitle } from "./layout";
import { Reveal } from "./motion";

const GROUPS: { label: string; type: CareerItem["type"] }[] = [
    { label: "경력", type: "career" },
    { label: "교육", type: "education" },
];

/** 기간 | 회사·직무·설명 형태의 표 형식 경력 리스트 */
export const CareerSection = () => (
    <section id="career" className="scroll-mt-16 py-28 md:py-40">
        <Container>
            <Reveal>
                <SectionTitle
                    title="Career"
                    lead="설문 플랫폼 스타트업에서 풀스택으로 서비스 전반을 경험했고, 지금은 대규모 커뮤니티 서비스의 프론트엔드를 맡고 있습니다."
                />
            </Reveal>

            <div className="space-y-16">
                {GROUPS.map((group) => (
                    <div key={group.type}>
                        <Reveal>
                            <h3 className="mb-4 text-sm text-zinc-500">
                                {group.label}
                            </h3>
                        </Reveal>
                        <Reveal>
                            <ul className="border-t border-white/15">
                                {careerData
                                    .filter((item) => item.type === group.type)
                                    .map((item) => (
                                        <li
                                            key={`${item.title}-${item.period}`}
                                            className="grid grid-cols-1 gap-2 border-b border-white/10 py-7 md:grid-cols-[260px_1fr] md:gap-16 lg:grid-cols-[300px_1fr] lg:gap-24"
                                        >
                                            <p className="flex items-center gap-2 self-start text-sm text-zinc-400 md:pt-1.5">
                                                {item.period}
                                                {item.period.includes(
                                                    "Present"
                                                ) && (
                                                    <span className="rounded border border-white/25 px-1.5 py-0.5 text-[10px] text-zinc-200">
                                                        {item.type === "career"
                                                            ? "재직 중"
                                                            : "재학 중"}
                                                    </span>
                                                )}
                                            </p>
                                            <div>
                                                <p className="text-lg font-bold text-white md:text-xl">
                                                    {item.company || item.title}
                                                </p>
                                                {item.company &&
                                                    !item.company.includes(
                                                        item.title
                                                    ) && (
                                                        <p className="mt-1 text-sm text-zinc-300">
                                                            {item.title}
                                                        </p>
                                                    )}
                                                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </Reveal>
                    </div>
                ))}
            </div>
        </Container>
    </section>
);
