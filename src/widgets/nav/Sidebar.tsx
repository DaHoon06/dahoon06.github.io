import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { tv } from "tailwind-variants";
import { GoHomeFill } from "react-icons/go";
import { IconLoader } from "@shared/ui/icons/IconLoader";

const SidebarItemStyle = tv({
    base: [
        "flex rounded-lg p-2 transition-all duration-200 ease-in-out hover:bg-gray-100",
        "flex-col items-center gap-2", // 기본 모바일용
        "md:gap-4", // md 이상에서 gap 변경
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
                <IconLoader>{icon}</IconLoader>
                <span className="md:block hidden text-s text-gray-800">
                    {label}
                </span>
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

export const Sidebar = ({
    isActive,
}: {
    isActive: (path: string) => boolean;
}): ReactElement => {
    const [currentPath, setCurrentPath] = useState("/");

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, [currentPath]);

    return (
        <aside className={SidebarStyle()}>
            <ul className="flex flex-col gap-4">
                <SidebarItem
                    href="/"
                    icon={<GoHomeFill color="#000" />}
                    label="홈"
                    active={isActive("/")}
                />
            </ul>

            <footer className="hidden h-auto w-full flex-col items-start gap-4 lg:flex">
                <p className="text-s">
                    © Dahoon06. 2025. All rights reserved.
                </p>
            </footer>
        </aside>
    );
};
