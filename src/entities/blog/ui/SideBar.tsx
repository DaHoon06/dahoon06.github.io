import { ReactElement } from "react";
import styles from "./SideBar.module.scss";
import Link from "next/link";
import { Logo } from "@shared/ui/Logo";
import { IoLogoGithub } from "react-icons/io5";

export const SideBar = (): ReactElement => {
    return (
        <div className={styles.sideBar}>
            <ul className={styles.itemList}>
                <li>
                    <Link href="/">
                        <Logo />
                    </Link>
                </li>
            </ul>

            <ul>
                <li>
                    <Link href="/">
                        <IoLogoGithub size={24} color="#fff" />
                    </Link>
                </li>
            </ul>
        </div>
    );
};
