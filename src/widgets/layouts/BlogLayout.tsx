import { ReactNode } from "react";
import { styled } from "styled-components";
import { StaticHeader } from "./Header";

const BaseContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #2d2d2d;
`;

const Main = styled.main`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: transparent;
    margin-top: 80px;
`;

interface BlogLayoutProps {
    children: ReactNode;
}

export const BlogLayout = ({ children }: BlogLayoutProps) => {
    return (
        <BaseContainer>
            <StaticHeader isShow={true} />
            <Main>{children}</Main>
        </BaseContainer>
    );
};
