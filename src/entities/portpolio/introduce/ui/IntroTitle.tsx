import { ReactElement } from "react";
import styles from "./IntroTitle.module.scss";

export const IntroTitle = (): ReactElement => {
    return (
        <section className={styles.title}>
            <div className={styles.top}>
                <span>웹</span>
                <span>-</span>
                <span>프</span>
                <span>론</span>
                <span>트</span>
                <span>엔</span>
                <span>드</span>
            </div>
            <div className={styles.bottom}>
                <span>포트</span>
                <span>-</span>
                <span>폴</span>
                <span>리</span>
                <span>오</span>
            </div>
        </section>
    );
};
