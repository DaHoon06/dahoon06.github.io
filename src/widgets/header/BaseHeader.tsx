import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "@shared/ui/Logo";
import { IoLogoGithub, IoMailOutline } from "react-icons/io5";

export const BaseHeader = (): ReactElement => {
    return (
        <header className="fixed top-0 right-0 left-0 z-10 h-[60px] w-full border-b border-[#e1e1e8] bg-white px-6">
            <nav className="flex h-full w-full items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        href="/tools/timestamp-converter"
                        className="text-sm text-gray-400 hover:text-primary-000 transition-colors"
                    >
                        <span>⚡Tools⚡</span>
                    </Link>
                    <a
                        onClick={() => alert("🚧 페이지 준비중 입니다 🚧")}
                        className="hidden md:block text-sm text-gray-400 "
                    >
                        <span>About Me</span>
                    </a>
                    <a
                        href="https://github.com/DaHoon06"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="dahoon06"
                        className="relative group"
                    >
                        <IoLogoGithub
                            size={26}
                            color="#000"
                            className="group-hover:animate-bounce group-hover:drop-shadow-lg transition-all duration-200"
                        />

                        <span className="absolute top-8 right-0 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none">
                            dahoon06 깃허브 바로가기
                        </span>
                    </a>

                    <a
                        href="mailto:dahoon226@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group"
                    >
                        <IoMailOutline
                            size={26}
                            color="#000"
                            className="group-hover:animate-bounce group-hover:drop-shadow-lg transition-all duration-200"
                        />
                        <span className="absolute top-8 right-0 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none">
                            dahoon226@gmail.com
                        </span>
                    </a>
                </div>
            </nav>
        </header>
    );
};
