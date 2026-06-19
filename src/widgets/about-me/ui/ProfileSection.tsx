import Image from "next/image";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profileData } from "../model";

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
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm font-semibold px-6 py-2 rounded-full whitespace-nowrap">
                    {profileData.title}
                </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left transition-all duration-300 ease-in-out motion-reduce:transition-none">
                <h2 className="text-2xl font-semibold mb-2">{profileData.name}</h2>
                <p className="text-sm text-gray-400 mb-4">{profileData.nameEn}</p>
                <div className="flex flex-col gap-1 mb-6">
                    {profileData.bio.map((line, i) => (
                        <p key={i} className="text-gray-600 text-sm">
                            {line}
                        </p>
                    ))}
                </div>

                <div className="flex gap-4 mb-8">
                    <a
                        href={profileData.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition"
                    >
                        <FaGithub size={18} />
                    </a>
                    <a
                        href={profileData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition"
                    >
                        <FaLinkedinIn size={18} />
                    </a>
                    <a
                        href={`mailto:${profileData.email}`}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition"
                    >
                        <FaEnvelope size={18} />
                    </a>
                </div>

                <div className="flex gap-6">
                    <div className="border border-gray-200 rounded-xl px-6 py-4 text-center">
                        <p className="text-xl font-bold text-[#222]">
                            {profileData.stats.experience}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Years Exp.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl px-6 py-4 text-center">
                        <p className="text-xl font-bold text-[#222]">
                            {profileData.stats.projects}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Projects</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const ProfileSection = () => {
    return (
        <section className="w-full">
            <ProfileCard />
        </section>
    );
};
