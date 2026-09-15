import { Reveal, ScrollFillText, CountUp, SectionHeading } from "./motion";

const STATEMENT =
    "안녕하세요, 프론트엔드 개발자 전다훈입니다. 2021년부터 B2B 설문 플랫폼과 커뮤니티 서비스를 만들며 사용자 경험을 최우선으로 고민해 왔습니다. 빠르고 직관적인 UI, 유지보수 가능한 코드, 그리고 팀과의 협업을 통해 더 나은 제품을 만드는 일을 좋아합니다.";

const VALUES = [
    { label: "사용자 중심", desc: "UX를 최우선으로 개발합니다" },
    { label: "지속 성장", desc: "끊임없이 배우고 도전합니다" },
    { label: "팀 협업", desc: "소통과 협력을 중요시합니다" },
    { label: "코드 품질", desc: "유지보수 가능한 코드를 씁니다" },
];

const STATS = [
    { value: 4, suffix: "+", label: "Years Experience" },
    { value: 10, suffix: "+", label: "Projects" },
];

/** 스크롤에 따라 단어가 밝아지는 자기소개 스테이트먼트 + 가치관/스탯 */
export const IntroSection = () => {
    return (
        <section className="mx-auto w-full max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
            <SectionHeading index="01" title="About" />

            <ScrollFillText
                text={STATEMENT}
                className="max-w-4xl text-2xl font-bold leading-snug text-white md:text-[2.6rem] md:leading-[1.35]"
            />

            <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-[1fr_1.2fr] md:gap-20">
                {/* 스탯 카운터 */}
                <div className="flex gap-12 md:flex-col md:gap-10">
                    {STATS.map((stat, i) => (
                        <Reveal key={stat.label} delay={i * 0.12}>
                            <p className="text-6xl font-black tracking-tight text-[#c9cbf8] md:text-7xl">
                                <CountUp
                                    value={stat.value}
                                    suffix={stat.suffix}
                                />
                            </p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                                {stat.label}
                            </p>
                        </Reveal>
                    ))}
                </div>

                {/* 가치관 카드 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {VALUES.map((value, i) => (
                        <Reveal key={value.label} delay={i * 0.1}>
                            <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[#c9cbf8]/60 hover:bg-[#c9cbf8]/[0.06]">
                                <p className="text-base font-bold text-white">
                                    {value.label}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                    {value.desc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
