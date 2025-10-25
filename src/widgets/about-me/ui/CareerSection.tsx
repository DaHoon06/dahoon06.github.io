import { FaBriefcase, FaSchool } from "react-icons/fa6";

export const careerData = [
    {
        title: "Frontend Engineer",
        company: "인스티즈(Instiz)",
        period: "2024.12 - Present",
        description: "연애 커뮤니티 및 음원 순위 차트 서비스 개발 및 유지보수",
        logo: "",
        type: "career",
        location: "Seoul, Korea",
    },
    {
        title: "Platform Engineer",
        company: "피앰아이(PMI)",
        period: "2021.01 - 2024.12",
        description: "B2B 설문조사 서비스 및 백오피스 개발 및 유지보수",
        type: "career",
        logo: "",
        location: "Seoul, Korea",
    },
    {
        title: "방송통신대학",
        company: "",
        period: "2024.03 - Present",
        description: "컴퓨터과학과",
        type: "education",
        logo: "",
        location: "Seoul, Korea",
    },
    {
        title: "KH 정보교육원",
        company: "",
        period: "2021.03 - 2021.08",
        description: " UI / UX 스마트 콘텐츠 융합 웹 개발자 과정",
        type: "education",
        logo: "",
        location: "Seoul, Korea",
    },
];

export const CareerSection = () => {
    return (
        <section className="relative w-full bg-white py-10 px-4 max-w-[1000px] mx-auto">
            <h2 className="text-left text-lg mb-10 text-[#222] font-semibold">
                Career & Education
            </h2>

            <div className="absolute top-[100px] w-[3px] h-[1066px]  bg-[#222] left-4 md:left-1/2 transform md:-translate-x-1/2" />

            <div className="flex flex-col gap-24 relative">
                {careerData.map((item, i) => (
                    <div
                        key={i}
                        className={`relative flex w-full items-center 
              ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} 
              justify-start
            `}
                    >
                        <div
                            className="absolute w-5 h-5 bg-white border-2 border-[#222] rounded-full
              left-[-8px] md:left-1/2 transform md:-translate-x-1/2"
                        />

                        <div
                            className={`w-[85%] md:w-[40%] border border-gray-300 p-6 bg-white shadow-sm 
                ml-10 md:ml-0
                ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}
              `}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <FaBriefcase className="w-4 h-4" />
                                <span className="text-xs bg-primary-000 text-white px-2 py-0.5 rounded">
                                    {item.type === "career"
                                        ? "Career"
                                        : "Education"}
                                </span>
                            </div>
                            <h4 className="text-base font-semibold">
                                {item.title}
                            </h4>
                            <p className="text-sm text-gray-700">
                                {item.company}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {item.period}
                            </p>
                            <p className="text-sm text-gray-700 mt-2">
                                {item.description}
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                {item.location}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
