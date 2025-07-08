import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footerLayout}>
            <div className={styles.footerContainer}>
                <ul>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                        Copyright 2025.
                        <Link href="https://github.com/Dahoon06">Dahoon06</Link>
                        All Rights Reserved.
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
