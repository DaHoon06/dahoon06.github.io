import Link from "next/link";
import SearchInput from "@entities/blog/ui/SearchInput";
import styles from "./BlogHeader.module.scss";
import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";

export const BlogHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.searchInputContainer}>
                <SearchInput />
            </div>

            <ul className={styles.headerItemList}>
                <li>
                    <div>
                        <IoPersonCircleOutline size={24} color="#222" />
                    </div>
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
