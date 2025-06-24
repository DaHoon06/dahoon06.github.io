import { ReactElement } from "react";
import styles from "./SlideTitle.module.scss";

interface SlideTitleProps {
    target: React.RefObject<HTMLDivElement>;
    title: string;
}

const SlideTitle = ({ target, title }: SlideTitleProps): ReactElement => {
    return (
        <div className={styles.slideTitleContainer}>
            <div className={styles.content} ref={target}>
                {Array(3)
                    .fill(0)
                    .map((e, i) => (
                        <h5 key={i} aria-label="hidden">
                            {title}
                        </h5>
                    ))}
            </div>
            <div className={styles.content} ref={target}>
                {Array(3)
                    .fill(0)
                    .map((e, i) => (
                        <h5 key={i} aria-label="hidden">
                            {title}
                        </h5>
                    ))}
            </div>
        </div>
    );
};

export default SlideTitle;
