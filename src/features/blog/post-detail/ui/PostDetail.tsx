import { ReactElement } from "react";
import { PostDetailForm } from "./PostDetailForm";
import { ReadingProgress } from "./ReadingProgress";
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
            <ReadingProgress />
            <PostDetailForm />
            {/* 본문 끝 — 진행 바와 같은 그라데이션 구분선 */}
            <div
                aria-hidden
                className="mx-auto my-16 h-0.5 max-w-[592px] bg-[linear-gradient(72deg,#291e95,#00a3cc)]"
            />
            {/* 글을 다 읽은 뒤 댓글로 넘어가기 직전 */}
            <DisplayAd className="mx-auto max-w-[720px]" />
            {/* PostHeader의 "댓글로 이동" 앵커 */}
            <div
                id="post-comments"
                className="mx-auto mt-12 max-w-[720px] scroll-mt-24"
            >
                <CommentBox data={data} />
            </div>
        </div>
    );
};
