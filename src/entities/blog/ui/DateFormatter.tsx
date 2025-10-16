import { postDateFormatter } from "@entities/blog/lib/formatDate";
import styles from "./DateFormatter.module.scss";

export const DateFormatter = ({ date }: { date: string }) => {
    return (
        <div className={styles.DateFormatter}>{postDateFormatter(date)}</div>
    );
};
