import { FaBriefcase, FaSchool } from "react-icons/fa6";
import { careerData } from "../model";

export const CareerSection = () => {
    return (
        <section className="relative w-full bg-white py-10 px-4">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="text-left text-lg mb-10 text-[#222] font-semibold">
                    Career & Education
                </h2>

                <div className="relative">
                    <div className="absolute top-0 bottom-0 w-[2px] bg-[#222] left-4 md:left-1/2 md:-translate-x-1/2" />

                    <div className="flex flex-col gap-16 pb-4">
                        {careerData.map((item, i) => (
                            <div
                                key={i}
                                className={`relative flex w-full items-center
                                    ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}
                                    justify-start
                                `}
                            >
                                <div className="absolute w-5 h-5 bg-white border-2 border-[#222] rounded-full left-[-8px] md:left-1/2 md:-translate-x-1/2" />

                                <div
                                    className={`w-[85%] md:w-[44%] border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl
                                        ml-10 md:ml-0
                                        ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}
                                    `}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        {item.type === "career" ? (
                                            <FaBriefcase className="w-3.5 h-3.5 text-gray-400" />
                                        ) : (
                                            <FaSchool className="w-3.5 h-3.5 text-gray-400" />
                                        )}
                                        <span className="text-xs bg-[#222] text-white px-2 py-0.5 rounded-full">
                                            {item.type === "career"
                                                ? "Career"
                                                : "Education"}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        {item.title}
                                    </h4>
                                    {item.company && (
                                        <p className="text-sm text-gray-600 mt-0.5">
                                            {item.company}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">
                                        {item.period}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {item.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
