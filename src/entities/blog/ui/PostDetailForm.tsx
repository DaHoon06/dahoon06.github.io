import { styled } from "styled-components";
import usePostQuery from "../services/usePostQuery";
import NotionRenderer from "@entities/notion/ui/NotionRenderer";
import { Category } from "./Category";
import { PostHeader } from "./PostHeader";

export const PostDetailForm = () => {
    const data = usePostQuery();

    if (!data) return null;

    const category = (data.category && data.category?.[0]) || undefined;

    return (
        <StyledWrapper>
            <article>
                {category && (
                    <div style={{ marginBottom: "0.5rem" }}>
                        <Category
                            readOnly={data.status?.[0] === "PublicOnDetail"}
                        >
                            {category}
                        </Category>
                    </div>
                )}
                {data.type[0] === "Post" && <PostHeader data={data} />}
                <NotionRenderer recordMap={data.recordMap} />
            </article>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    margin: 0 auto;
    max-width: 56rem;
`;
