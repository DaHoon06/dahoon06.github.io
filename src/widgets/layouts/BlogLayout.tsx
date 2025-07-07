import { ReactNode } from "react";
import { BlogHeader } from "./Header";
import styles from "./BlogLayout.module.scss";
import { AnimatePresence, motion } from "framer-motion";

interface BlogLayoutProps {
    children: ReactNode;
    isSearch?: boolean;
    onChangeKeyword?: (keyword: string) => void;
}

export const BlogLayout = ({
    children,
    isSearch = false,
    onChangeKeyword,
}: BlogLayoutProps) => {
    return (
        <div className={styles.blogLayout}>
            <BlogHeader
                isMobile={false}
                isSearch={isSearch}
                onChangeKeyword={onChangeKeyword}
            />
            <AnimatePresence mode="wait">
                <motion.main
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        paddingLeft: "60px",
                    }}
                >
                    <div className={styles.main}>{children}</div>
                </motion.main>
            </AnimatePresence>
        </div>
    );
};
