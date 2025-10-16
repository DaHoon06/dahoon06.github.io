import { ReactElement } from "react";
import { PostDetailForm } from "./PostDetailForm";
import styles from "./PostDetail.module.scss";
import usePostQuery from "@entities/blog/model/queries/usePostQuery";
import useMermaidEffect from "@entities/blog/hooks/useMermaidEffect";

export const PostDetail = (): ReactElement | null => {
    const data = usePostQuery();
    useMermaidEffect();

    if (!data) return null;

    return (
        <div className={styles.postDetail} data-type={data.type}>
            {data.type[0] === "Page" && <PostDetailForm />}
            {data.type[0] !== "Page" && <PostDetailForm />}
        </div>
    );
};
