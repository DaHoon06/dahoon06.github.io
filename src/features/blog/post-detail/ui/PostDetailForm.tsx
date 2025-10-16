import NotionRenderer from "@entities/notion/ui/NotionRenderer";
import { PostHeader } from "./PostHeader";
import styles from "./PostDetailForm.module.scss";
import { ReactElement } from "react";
import usePostQuery from "@entities/blog/model/queries/usePostQuery";

export const PostDetailForm = (): ReactElement | null => {
    const data = usePostQuery();

    if (!data) return null;

    const category = (data.category && data.category?.[0]) || undefined;

    return (
        <div className={styles.postDetailForm}>
            <article className="w-full">
                {data.type[0] === "Post" && <PostHeader data={data} />}
                <NotionRenderer recordMap={data.recordMap} />
            </article>
        </div>
    );
};
