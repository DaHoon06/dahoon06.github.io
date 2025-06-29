import { ReactNode } from "react";
import { BlogHeader } from "./Header";
import Footer from "./Footer";
import styles from "./BlogLayout.module.scss";
import { SideBar } from "@entities/blog/ui/SideBar";

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
                <main className={styles.main}>{children}</main>
                <Footer />
            </div>
        </div>
    );
};
