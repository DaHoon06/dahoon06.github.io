import { postDateFormatter } from "@entities/blog/lib/formatDate";
import styles from "./DateFormmater.module.scss";

export const DateFormmater = ({ date }: { date: string }) => {
    return (
        <div className={styles.dateFormmater}>{postDateFormatter(date)}</div>
    );
};
