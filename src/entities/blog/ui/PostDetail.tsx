import { styled } from "styled-components";
import useMermaidEffect from "../hooks/useMermaidEffect";
import usePostQuery from "../services/usePostQuery";
import { PostDetailForm } from "./PostDetailForm";

export const PostDetail = () => {
    const data = usePostQuery();
    useMermaidEffect();

    if (!data) return null;

    return (
        <StyledWrapper data-type={data.type}>
            {data.type[0] === "Page" && <PostDetailForm />}
            {data.type[0] !== "Page" && <PostDetailForm />}
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    padding: 2rem 0;

    &[data-type="Paper"] {
        padding: 40px 0;
    }
`;
