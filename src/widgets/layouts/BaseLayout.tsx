import { ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BaseHeader } from "@widgets/header";
import { BottomNavigation, Sidebar } from "@widgets/nav";

interface BaseLayoutProps {
    children: ReactNode;
    onChangeKeyword?: (keyword: string) => void;
}

export const BaseLayout = ({ children, onChangeKeyword }: BaseLayoutProps) => {
    const [currentPath, setCurrentPath] = useState("/");

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const isActive = useMemo(
        () => (path: string) => path === currentPath,
        [currentPath]
    );

    return (
        <div className="flex h-full min-h-[100vh] w-full flex-col">
            <BaseHeader onChangeKeyword={onChangeKeyword} />
            <div className="xs:p-0 mt-[60px] flex h-[calc(100vh-60px)] w-full pb-[60px]">
                <Sidebar isActive={isActive} />
                <AnimatePresence mode="wait">
                    <motion.main
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 overflow-y-auto"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </div>
            <BottomNavigation
                className={"xs:hidden z-50 h-[60px]"}
                isActive={isActive}
            />
        </div>
    );
};
