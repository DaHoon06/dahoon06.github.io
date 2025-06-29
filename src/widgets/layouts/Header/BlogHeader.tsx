import Link from "next/link";
import SearchInput from "@entities/blog/ui/SearchInput";
import styles from "./BlogHeader.module.scss";
import { IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";

interface BlogHeaderProps {
    isSearch?: boolean;
}

export const BlogHeader = ({ isSearch = false }: BlogHeaderProps) => {
    return (
        <header className={styles.header}>
            {isSearch && (
                <div className={styles.searchInputContainer}>
                    <SearchInput />
                </div>
            )}

            <ul className={styles.headerItemList}>
                <li>
                    <Link href="/me" className={styles.profileContainer}>
                        <span className={styles.profileName}>dahoon06</span>
                        <Image
                            src="/images/dahoon06.jpg"
                            alt="dahoon06"
                            style={{ borderRadius: "50%" }}
                            width={30}
                            height={30}
                        />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <IoLogOutOutline size={24} color="#222" />
                    </Link>
                </li>
            </ul>
        </header>
    );
};
