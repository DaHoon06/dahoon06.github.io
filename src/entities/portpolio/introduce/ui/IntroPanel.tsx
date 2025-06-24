import { ReactElement } from "react";
import styles from "./IntroPanel.module.scss";
import { IntroTitle } from "./IntroTitle";

export const IntroPanel = (): ReactElement => {
    return (
        <article className={styles.introPanel}>
            <IntroTitle />
        </article>
    );
};
