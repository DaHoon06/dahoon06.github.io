import React from "react";
import { NextPageWithLayout } from "@shared/types";
import { styled } from "styled-components";
import { Emoji } from "@shared/ui/icons/Emoji";
import CustomHead from "@shared/ui/heads/CustomHead";
import Link from "next/link";

type Props = {
    tags: any;
    posts: any;
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
                <Link
                    href="/"
                    replace
                    className="text-sm text-gray-400 hover:text-primary-000 transition-colors"
                >
                    <span>🚀 블로그로 돌아가기</span>
                </Link>
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
    /* 뷰포트 기준 중앙 정렬 및 레이아웃 안정화 */
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 12rem); /* 헤더/푸터 공간 고려한 여백 */
    text-align: center;

    .wrapper {
        display: flex;
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
        width: 100%;

        > .top {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            font-size: 3.75rem;
            line-height: 1;
            font-weight: 700;
            /* 숫자와 이모지 정렬 안정화 */
            > * {
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
        }

        > .text {
            font-size: 1.125rem;
            line-height: 1.75rem;
            color: #ededed;
        }
    }

    @media (min-width: 640px) {
        .wrapper {
            > .top {
                font-size: 5rem;
            }
            > .text {
                font-size: 1.25rem;
                line-height: 1.875rem;
            }
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
