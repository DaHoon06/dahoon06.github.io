import { ReactElement } from "react";
import { Menu, X } from "lucide-react";
import { IoLogoGithub, IoMailOutline } from "react-icons/io5";
import { CONFIG } from "@root/site.config";

interface BaseHeaderProps {
    pageTitle: string;
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export const BaseHeader = ({
    pageTitle,
    isSidebarOpen,
    onToggleSidebar,
}: BaseHeaderProps): ReactElement => {
    return (
        <header className="shrink-0 bg-white border-b border-zinc-200 h-14 flex items-center gap-3 px-4 sm:px-6">
            {/* Mobile hamburger */}
            <button
                onClick={onToggleSidebar}
                className="lg:hidden p-1.5 -ml-1 rounded-md hover:bg-zinc-100 transition-colors text-zinc-500"
                aria-label="메뉴 열기"
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Page title */}
            <h1 className="flex-1 text-sm font-semibold text-zinc-800 tracking-tight">
                {pageTitle}
            </h1>

            {/* Right actions */}
            <div className="flex items-center gap-1">
                <a
                    href={`https://github.com/${CONFIG.profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
                >
                    <IoLogoGithub size={18} />
                </a>
                <a
                    href={`mailto:${CONFIG.profile.email}`}
                    title="이메일"
                    className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
                >
                    <IoMailOutline size={18} />
                </a>
            </div>
        </header>
    );
};
