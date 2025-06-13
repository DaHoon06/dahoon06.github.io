import { useRouter } from "next/router";
import React from "react";

type TagProps = {
    children: string;
};

export const Tag: React.FC<TagProps> = ({ children }) => {
    const router = useRouter();

    const handleClick = (value: string) => {
        router.push(`/?tag=${value}`);
    };
    return <div onClick={() => handleClick(children)}>{children}</div>;
};
