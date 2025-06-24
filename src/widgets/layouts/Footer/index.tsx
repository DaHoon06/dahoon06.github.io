import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footerLayout}>
            <div className={styles.footerContainer}>
                <ul>
                    <li>
                        Copyright 2024. Developer Dahoon06 All Rights Reserved.
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
