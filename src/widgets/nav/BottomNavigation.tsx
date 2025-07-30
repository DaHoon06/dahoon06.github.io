import { IconLoader } from "@shared/ui/icons/IconLoader";
import Link from "next/link";
import { HTMLAttributes, ReactElement } from "react";
import { GoHomeFill } from "react-icons/go";
import classNames from "classnames";

interface BottomNavigationProps extends HTMLAttributes<HTMLDivElement> {
    isActive: (path: string) => boolean;
}

export const BottomNavigation = ({
    className,
    isActive,
}: BottomNavigationProps): ReactElement => {
    return (
        <nav
            className={classNames(
                "fixed right-0 bottom-0 left-0 w-full border-t border-[#e1e1e8] bg-white",
                className
            )}
        >
            <ul className="flex h-full w-full items-center justify-start gap-8 px-8">
                <li>
                    <Link
                        href="/"
                        className={classNames(
                            isActive("/")
                                ? "text-primary-200"
                                : "text-gray-600",
                            "flex flex-col items-center gap-1"
                        )}
                    >
                        <IconLoader>
                            <GoHomeFill />
                        </IconLoader>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
