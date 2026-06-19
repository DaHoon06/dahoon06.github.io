const values = [
    { label: "사용자 중심", desc: "UX를 최우선으로 개발합니다" },
    { label: "지속 성장", desc: "끊임없이 배우고 도전합니다" },
    { label: "팀 협업", desc: "소통과 협력을 중요시합니다" },
    { label: "코드 품질", desc: "유지보수 가능한 코드를 씁니다" },
];

export const AboutMeSection = () => {
    return (
        <section className="w-full bg-[#222] px-4 py-16">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="text-lg font-semibold text-white mb-10">
                    About Me
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-5">
                        <p className="text-gray-300 leading-relaxed text-sm">
                            안녕하세요,{" "}
                            <strong className="text-white">
                                프론트엔드 개발자 전다훈
                            </strong>
                            입니다. 2021년부터 B2B 설문 플랫폼과 커뮤니티
                            서비스를 개발하며 약 4년간의 실무 경험을
                            쌓아왔습니다.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            사용자 경험을 최우선으로 생각하며, 빠르고 직관적인
                            UI를 구현하는 것을 중요하게 여깁니다. 코드 품질과
                            성능 최적화에 관심이 많으며, 팀원들과의 협업을 통해
                            더 나은 제품을 만들어 나갑니다.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            새로운 기술을 배우는 것을 즐기며, 이 블로그를 통해
                            배움과 경험을 기록하고 있습니다.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {values.map((v) => (
                            <div
                                key={v.label}
                                className="border border-gray-600 rounded-xl p-4 hover:border-gray-400 transition-colors"
                            >
                                <p className="text-white font-semibold text-sm">
                                    {v.label}
                                </p>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
