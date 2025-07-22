import { ReactElement } from "react";
// import { Menu, Search } from 'lucide-react';
import Link from "next/link";
import { Logo } from "@shared/ui/Logo";
// import { ROUTES } from '@src/app/routes';

interface HeaderProps {
    isMobile?: boolean;
}

export const Header = ({ isMobile = false }: HeaderProps): ReactElement => {
    return (
        <header className="fixed top-0 right-0 left-0 z-10 h-[60px] w-full border-b border-[#e1e1e8] bg-white px-6">
            <nav className="flex h-full w-full items-center justify-between">
                <h2 className="text-xl font-bold">
                    <Link href="/">
                        <Logo />
                        <span>프론트-엔드</span>
                        <h1 className="target">전다훈</h1>
                    </Link>
                </h2>
                <ul className="flex items-center gap-4">
                    <li>
                        <button type="button">{/* <Search /> */}검색</button>
                    </li>
                    {isMobile && (
                        <li>
                            <button type="button">
                                {/* <Menu /> */} 햄버거 버튼
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};
