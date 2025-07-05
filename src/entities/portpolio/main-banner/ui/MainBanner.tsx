import { ReactElement } from "react";
import styles from "./MainBanner.module.scss";

export const MainBanner = (): ReactElement => {
    return (
        <article className={styles.mainBanner}>
            <p className={styles.description}>
                현재 프론트엔드 개발자로 활동하며, 더 나은 사용자 경험을 위해
                끊임없이 고민하고 도전하고 있습니다. 이 블로그는 저의 개발
                히스토리, 학습 내용, 그리고 다양한 기술적 경험을 기록하고
                공유하기 위해 만들어졌습니다.
            </p>
            <p className={styles.description}>
                새로운 기술을 배우고, 문제를 해결하며 성장하는 과정을 함께
                나누고 싶습니다. 앞으로의 여정도 많은 관심과 응원 부탁드립니다!
            </p>
        </article>
    );
};
