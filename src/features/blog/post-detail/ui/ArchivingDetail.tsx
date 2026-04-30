import { ReactElement } from "react";
import styles from "./PostDetail.module.scss";
import formStyles from "./PostDetailForm.module.scss";
import useMermaidEffect from "@entities/blog/hooks/useMermaidEffect";
import { useArchivingQuery } from "@features/blog/post-list/model/queries";
import { NotionRenderer } from "react-notion-x";
import { PostHeader } from "./PostHeader";

export const ArchivingDetail = (): ReactElement | null => {
    const data: any = useArchivingQuery();
    useMermaidEffect();

    if (!data) return null;

    return (
        <div className={styles.postDetail} data-type={data.type}>
            <div className={formStyles.postDetailForm}>
                <article className="w-full">
                    {data.type[0] === "Post" && <PostHeader data={data} />}
                    <NotionRenderer recordMap={data.recordMap} />
                </article>
            </div>
        </div>
    );
};
