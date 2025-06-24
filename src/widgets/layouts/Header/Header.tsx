import styles from "./Header.module.scss";
import Link from "next/link";
import { Logo } from "@shared/ui/Logo";

interface HeaderProps {
    isMobile: boolean;
    func: () => void;
}

export const Header = ({ isMobile, func }: HeaderProps) => {
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

                {isMobile && (
                    <button
                        type="button"
                        className={styles.menuButton}
                        onClick={() => func()}
                    >
                        =
                    </button>
                )}

                {!isMobile && (
                    <div className={styles.menu}>
                        <Link href="#about">인터뷰</Link>
                        <Link href="#career">이력</Link>
                        <Link href="#projects">프로젝트</Link>
                        <Link href="/blog">블로그</Link>
                    </div>
                )}
            </div>
        </header>
    );
};
