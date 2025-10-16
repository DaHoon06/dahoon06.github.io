import { PostType } from "@entities/notion/types";
import { CONFIG } from "@root/site.config";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const UtterancesComponent = dynamic(
    () => {
        return import("./Utterances");
    },
    { ssr: false }
);

type Props = {
    data: PostType;
};

const CommentBox: React.FC<Props> = ({ data }) => {
    return (
        <>
            {CONFIG.utterances.enable && (
                <UtterancesComponent
                    issueTerm={data.id}
                    preferredTheme="light"
                />
            )}
        </>
    );
};

export default CommentBox;
