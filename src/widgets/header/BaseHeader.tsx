import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "@shared/ui/Logo";

interface BaseHeaderProps {
    onChangeKeyword?: (keyword: string) => void;
}

export const BaseHeader = ({
    onChangeKeyword,
}: BaseHeaderProps): ReactElement => {
    return (
        <header className="fixed top-0 right-0 left-0 z-10 h-[60px] w-full border-b border-[#e1e1e8] bg-white px-6">
            <nav className="flex h-full w-full items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                </Link>
                <input
                    onChange={(e) => onChangeKeyword?.(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="flex-1 max-w-[200px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary-000 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
            </nav>
        </header>
    );
};
