"use client";

import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { tv } from "tailwind-variants";

const SidebarItemStyle = tv({
    base: [
        "flex rounded-lg p-2 transition-all duration-200 ease-in-out hover:bg-gray-100",
        "flex-col items-center gap-2", // 기본 모바일용
        "md:gap-1", // md 이상에서 gap 변경
        "lg:flex-row lg:text-center", // lg 이상에서 레이아웃 변경
    ],
    variants: {
        active: {
            true: "bg-gray-100 text-blue-600",
            false: "text-gray-600",
        },
    },
});

const SidebarItem = ({
    href,
    icon,
    label,
    active = false,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}): ReactElement => {
    return (
        <li>
            <Link href={href} className={SidebarItemStyle({ active })}>
                <div className="flex items-center justify-center [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-none [&>svg]:stroke-current">
                    {icon}
                </div>
                <span className="text-s">{label}</span>
            </Link>
        </li>
    );
};

const SidebarStyle = tv({
    base: [
        "sticky top-0 left-0 hidden h-full flex-col justify-between border-r border-[#e1e1e8] bg-white transition-all duration-200 ease-in-out",
        "xs:flex w-20 p-3 lg:w-64 lg:p-5",
    ],
});

export const Sidebar = (): ReactElement => {
    const [currentPath, setCurrentPath] = useState("/");

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, [currentPath]);

    const isActive = (path: string) => currentPath === path;

    return (
        <aside className={SidebarStyle()}>
            <ul className="flex flex-col gap-4">
                <SidebarItem
                    href="/"
                    icon={<span>아이콘</span>}
                    label="홈"
                    active={isActive("/")}
                />
                {/* <SidebarItem href="#" icon={<span>아이코</span>>} label="랭킹" active={isActive('/test')} /> */}
            </ul>

            <footer className="hidden h-auto w-full flex-col items-start gap-4 lg:flex">
                <p className="text-s">
                    © Dahoon06. 2025. All rights reserved.
                </p>
            </footer>
        </aside>
    );
};
