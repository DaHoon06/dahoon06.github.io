import NotionRenderer from "@entities/notion/ui/NotionRenderer";
import { PostHeader } from "./PostHeader";
import styles from "./PostDetailForm.module.scss";
import { ReactElement } from "react";
import usePostQuery from "../model/use-post-query";

export const PostDetailForm = (): ReactElement | null => {
    const data = usePostQuery();

    if (!data) return null;

    return (
        <div className={styles.postDetailForm}>
            <article className="w-full">
                {data.type[0] === "Post" && <PostHeader data={data} />}
                <NotionRenderer recordMap={data.recordMap} />
            </article>
        </div>
    );
};
