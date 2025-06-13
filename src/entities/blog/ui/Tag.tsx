import { useRouter } from "next/router";
import React from "react";
import { styled } from "styled-components";

const StyledTag = styled.button`
    padding: 0.25rem 0.5rem;
    border-radius: 50px;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 400;
    color: #3a3a3a;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #e0e0e0;
    }
`;

interface TagProps {
    children: string;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
    const router = useRouter();

    const handleClick = (value: string) => {
        router.push(`/?tag=${value}`);
    };
    return (
        <StyledTag type="button" onClick={() => handleClick(children)}>
            {children}
        </StyledTag>
    );
};
