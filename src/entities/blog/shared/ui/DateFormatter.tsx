import { postDateFormatter } from "@entities/blog/posts/lib/formatDate";
import styles from "./DateFormatter.module.scss";

export const DateFormatter = ({ date }: { date: string }) => {
    return (
        <div className={styles.DateFormatter}>{postDateFormatter(date)}</div>
    );
};
