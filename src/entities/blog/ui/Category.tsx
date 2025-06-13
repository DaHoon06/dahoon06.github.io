import { useRouter } from "next/router";
import styled from "styled-components";

export const StyledCategoryButton = styled.button`
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    width: fit-content;
    font-size: 0.875rem;
    line-height: 1.25rem;
    opacity: 0.9;
    color: #666666;
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }
`;

type CategoryProps = {
    children: string;
    readOnly?: boolean;
};

export const Category = ({ children, readOnly = false }: CategoryProps) => {
    const router = useRouter();

    const handleClick = (value: string) => {
        if (readOnly) return;
        router.push(`/?category=${value}`);
    };

    return (
        <StyledCategoryButton
            type="button"
            onClick={() => handleClick(children)}
        >
            {children}
        </StyledCategoryButton>
    );
};
