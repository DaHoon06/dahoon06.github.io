import React from "react";
import { TTags } from "@shared/types";
import { TPosts } from "@shared/types";
import { NextPageWithLayout } from "@shared/types";
import { styled } from "styled-components";
import { Emoji } from "@shared/ui/icons/Emoji";
import CustomHead from "@shared/ui/heads/CustomHead";

type Props = {
    tags: TTags;
    posts: TPosts;
};

type CustomErrorProps = Record<string, never>;

const CustomError: React.FC<CustomErrorProps> = () => {
    return (
        <StyledWrapper>
            <div className="wrapper">
                <div className="top">
                    <div>4</div>
                    <Emoji>🤔</Emoji>
                    <div>4</div>
                </div>
                <div className="text">Post not found</div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    border-radius: 1.5rem;
    max-width: 56rem;
    .wrapper {
        display: flex;
        padding-top: 5rem;
        padding-bottom: 5rem;
        flex-direction: column;
        gap: 2.5rem;
        align-items: center;
        > .top {
            display: flex;
            align-items: center;
            font-size: 3.75rem;
            line-height: 1;
        }
        > .text {
            font-size: 1.875rem;
            line-height: 2.25rem;
            color: #ededed;
        }
    }
`;

const NotFoundPage: NextPageWithLayout<Props> = () => {
    return <CustomError />;
};

NotFoundPage.getLayout = (page) => {
    return (
        <>
            <CustomHead
                {...{
                    title: "404",
                    description: "404",
                    type: "website",
                    url: "",
                }}
            />
            {page}
        </>
    );
};

export default NotFoundPage;
