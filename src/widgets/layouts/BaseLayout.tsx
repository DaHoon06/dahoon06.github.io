"use client";

import { ReactNode, useState, useEffect } from "react";
import { Header } from "./header";
import { Sidebar } from "./nav";
import { AnimatePresence, motion } from "framer-motion";

interface BaseLayoutProps {
    children: ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 500);
        };

        checkIsMobile();

        window.addEventListener("resize", checkIsMobile);

        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    return (
        <div className="flex h-full min-h-[100vh] w-full flex-col">
            <Header isMobile={isMobile} />
            <div className="mt-[60px] flex h-[calc(100vh-60px)] w-full">
                <Sidebar />
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
        </div>
    );
};
