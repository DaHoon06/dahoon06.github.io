import Link from "next/link";
import styles from "./BlogHeader.module.scss";
import { Logo } from "@shared/ui/Logo";
import SearchInput from "@entities/blog/shared/ui/SearchInput";

interface BlogHeaderProps {
    isMobile: boolean;
    isSearch?: boolean;
    onChangeKeyword?: (keyword: string) => void;
}

export const BlogHeader = ({
    isMobile,
    isSearch = false,
    onChangeKeyword,
}: BlogHeaderProps) => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerInner}>
                <section className={styles.logo}>
                    <Link href="#intro">
                        <Logo />
                        <h1>프론트-엔드</h1>
                        <h1 className="target">전다훈</h1>
                    </Link>
                </section>
                <div>
                    {!isMobile && (
                        <>
                            {isSearch && (
                                <SearchInput
                                    onChange={(e) =>
                                        onChangeKeyword?.(e.target.value)
                                    }
                                />
                            )}
                            <div className={styles.menu}>
                                <Link href="/blog">블로그</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
