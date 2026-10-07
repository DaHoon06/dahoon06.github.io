import { ReactElement } from "react";
import { PostDetailForm } from "./PostDetailForm";
import styles from "./PostDetail.module.scss";
import usePostQuery from "../model/use-post-query";
import useMermaidEffect from "@entities/blog/lib/use-mermaid-effect";
import CommentBox from "@entities/comment/ui/CommentBox";
import { DisplayAd } from "@shared/ui/ads";

export const PostDetail = (): ReactElement | null => {
    const data = usePostQuery();
    useMermaidEffect();

    if (!data) return null;

    return (
        <div className={styles.postDetail} data-type={data.type}>
            <PostDetailForm />
            {/* 글을 다 읽은 뒤 댓글로 넘어가기 직전 */}
            <DisplayAd className="mx-auto mt-12 max-w-[720px]" />
            <div className="mx-auto mt-12 max-w-[720px] border-t border-zinc-200 pt-10">
                <CommentBox data={data} />
            </div>
        </div>
    );
};
