import { Emoji } from "@shared/ui/icons/Emoji";
import styles from "./TagList.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTagsQuery } from "@entities/blog/tag/hooks/useTagsQuery";

export const TagList = () => {
    const router = useRouter();
    const currentTag = router.query.tag || undefined;
    const data = useTagsQuery();

    return (
        <div className={styles.tagList}>
            <div className={styles.top}>
                <Emoji>🏷️</Emoji> Tags
            </div>
            <div className={styles.list}>
                {Object.keys(data).map((key) => (
                    <Link
                        key={key}
                        href={`/blog?tag=${key}`}
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
