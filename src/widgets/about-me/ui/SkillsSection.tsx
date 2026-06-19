import { skillsData } from "../model";

export const SkillsSection = () => {
    return (
        <section className="w-full bg-white py-16 px-4">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="text-lg font-semibold text-[#222] mb-10">
                    Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {skillsData.map((category) => (
                        <div key={category.category}>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                {category.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 text-sm border border-gray-200 rounded-full text-gray-700 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-colors"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
