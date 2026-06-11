import styles from "./TagList.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTagsQuery } from "@features/blog/post-list";
import { ROUTES } from "@shared/routes";

export const TagList = () => {
    const router = useRouter();
    const currentTag = router.query.tag || undefined;
    const data = useTagsQuery();

    return (
        <div className={styles.tagList}>
            <div className={styles.top}>태그</div>
            <div className={styles.list}>
                {Object.keys(data).map((key) => (
                    <Link
                        key={key}
                        href={ROUTES.POSTS_WITH_TAG(key)}
                        data-active={key === currentTag}
                        className={styles.tag}
                    >
                        {key}
                    </Link>
                ))}
            </div>
        </div>
    );
};
