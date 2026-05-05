import React from "react";
import { styled } from "styled-components";
import { Emoji } from "../icons/Emoji";
import { useScheme } from "@entities/notion";

type Props = {};

const ThemeToggle: React.FC<Props> = () => {
    const [scheme, setScheme] = useScheme();

    const handleClick = () => {
        setScheme(scheme === "light" ? "dark" : "light");
    };

    return (
        <StyledWrapper onClick={handleClick}>
            <Emoji>{scheme === "light" ? "☀️" : "🌙"}</Emoji>
        </StyledWrapper>
    );
};

export default ThemeToggle;

const StyledWrapper = styled.div`
    cursor: pointer;
`;
