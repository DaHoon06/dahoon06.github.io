import { ReactNode } from "react";
import { BlogHeader } from "./Header";
import Footer from "./Footer";
import styles from "./BlogLayout.module.scss";
import { SideBar } from "@entities/blog/ui/SideBar";

interface BlogLayoutProps {
    children: ReactNode;
}

export const BlogLayout = ({ children }: BlogLayoutProps) => {
    return (
        <div className={styles.blogLayout}>
            <SideBar />
            <div>
                <BlogHeader />
                <main className={styles.main}>{children}</main>
                <Footer />
            </div>
        </div>
    );
};
