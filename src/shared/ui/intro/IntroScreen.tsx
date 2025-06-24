import styled from "styled-components";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { ArrowButton } from "./ArrowButton";
import { StaticHeader } from "@widgets/layouts/Header";
import FlexBox from "@shared/ui/boxes/FlexBox";
import { GitHubIcon, BlogIcon } from "@shared/ui/icons";
import { IntroMessageBox } from "./IntroMessageBox";
import Link from "next/link";
import { AnimationHeader } from "@widgets/layouts/Header/AnimationHeader";
import { Animation } from "@shared/utils";
import { useMatchMedia, useRouteLoading } from "@shared/hooks";

const IntroScreenLayout = styled.article`
    position: sticky;
    top: 0;
    left: 0;
    z-index: 9;
    min-width: 100vw;
    min-height: calc(100vh - 60px);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .message-box {
        position: relative;
        padding: 1em 2em;
        margin: 0 auto;
        max-width: 1000px;
        width: 100%;

        @media screen and (max-width: 767px) {
            padding: 0.8em 1.5em;
        }
    }

    .link-lists {
        padding: 1em 2em;
        display: flex;
        gap: 20px;

        @media screen and (max-width: 767px) {
            padding: 0.8em 1.5em;
        }
    }
`;

export const LinkItem = () => {
    return (
        <ul className="link-lists">
            <li>
                <Link href="https://github.com/dahoon06" target="_blank">
                    <GitHubIcon />
                </Link>
            </li>
            <li>
                <Link href="/blog">
                    <BlogIcon />
                </Link>
            </li>
        </ul>
    );
};

export const IntroScreen = forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<object>
>((props, ref: Ref<HTMLDivElement>) => {
    const isMobile = useMatchMedia("(max-width: 768px)");
    const { isLoaded, loadingCount } = useRouteLoading();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isMobile) {
            (async () => {
                await Animation.layout.main();
            })();
        }
        // 클린업 함수는 반환하지 않음
    }, [isMobile]);

    useEffect(() => {
        isVisible && setIsVisible(!isVisible);
    }, [isMobile]);

    return (
        <IntroScreenLayout ref={ref}>
            <AnimationHeader
                isMobile={isMobile}
                isVisible={isVisible}
                func={() => {
                    setIsVisible(!isVisible);
                }}
            />
            {/* <StaticHeader isShow={true} /> */}
            <FlexBox
                $flexDirection="column"
                $alignItems="flex-start"
                className="message-box"
            >
                <IntroMessageBox />
                <LinkItem />
            </FlexBox>
            <ArrowButton />
        </IntroScreenLayout>
    );
});

IntroScreen.displayName = "IntroScreen";
