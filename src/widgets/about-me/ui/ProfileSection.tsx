import Image from "next/image";

import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";

const ProfileCard = () => {
    return (
        <section className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-16 py-16 px-4 max-w-[1000px] mx-auto transition-all duration-300 ease-in-out motion-reduce:transition-none">
            <div className="relative w-56 h-56 rounded-full border-4 border-[#222] flex-shrink-0 bg-gray-100">
                <Image
                    src="/images/profile.png"
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                />
                <div className="absolute  -bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm font-semibold px-6 py-2 rounded-full whitespace-nowrap">
                    Frontend Developer
                </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left transition-all duration-300 ease-in-out motion-reduce:transition-none">
                <h2 className="text-2xl font-semibold mb-2">전다훈</h2>
                <div className="flex flex-col gap-1 mb-6">
                    <p className="text-gray-600 text-base">
                        새로운 도전을 두려워하지 않고, 더 나은 경험을 위한
                        코드를 고민합니다.
                    </p>
                    <p className="text-gray-600 text-base">
                        더 나은 UI와 더 빠른 웹을 위해 항상 배우고, 도전합니다.
                    </p>
                    <p className="text-gray-600 text-base">
                        끊임없는 실험과 개선으로 성장하는 프론트엔드 개발자
                        전다훈입니다.
                    </p>
                </div>

                <div className="flex gap-4">
                    <a
                        href="https://github.com/dahoon06"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition"
                    >
                        <FaGithub size={18} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition"
                    >
                        <FaLinkedinIn size={18} />
                    </a>
                    <a
                        href="mailto:dahoon226@gmail.com"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition"
                    >
                        <FaEnvelope size={18} />
                    </a>
                </div>

                {/* 정보 카드 */}
                {/* <div className="flex gap-6">
                    <div className="border border-gray-200 rounded-md px-6 py-4">
                        <p className="text-gray-500 text-sm mb-1">Experience</p>
                        <p className="text-lg font-semibold">3+ Years</p>
                    </div>
                    <div className="border border-gray-200 rounded-md px-6 py-4">
                        <p className="text-gray-500 text-sm mb-1">Projects</p>
                        <p className="text-lg font-semibold">30+ Completed</p>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export const ProfileSection = () => {
    return (
        <section className="w-full ">
            <ProfileCard />
        </section>
    );
};
