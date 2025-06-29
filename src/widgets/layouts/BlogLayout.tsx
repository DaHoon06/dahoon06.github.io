import { ReactNode } from "react";
import { BlogHeader } from "./Header";
import Footer from "./Footer";
import styles from "./BlogLayout.module.scss";
import { SideBar } from "@entities/blog/ui/SideBar";
import { AnimatePresence, motion } from "framer-motion";

interface BlogLayoutProps {
    isSearch?: boolean;
    children: ReactNode;
}

export const BlogLayout = ({ children, isSearch = false }: BlogLayoutProps) => {
    return (
        <div className={styles.blogLayout}>
            <SideBar />
            <div>
                <BlogHeader isSearch={isSearch} />
                <AnimatePresence mode="wait">
                    <motion.main
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.main}>{children}</div>
                    </motion.main>
                </AnimatePresence>
                <Footer />
            </div>
        </div>
    );
};
