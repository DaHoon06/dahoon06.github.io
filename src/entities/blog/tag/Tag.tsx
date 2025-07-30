import { useRouter } from "next/router";
import React from "react";

interface TagProps {
    children: string;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
    const router = useRouter();

    const handleClick = (value: string) => {
        router.push(`/?tag=${value}`);
    };
    return (
        <button
            className="rounded-full text-[1.05rem] font-normal text-white bg-primary px-4 py-1 cursor-pointer transition-colors duration-200 hover:bg-gray-200 hover:text-primary"
            type="button"
            onClick={() => handleClick(children)}
        >
            {children}
        </button>
    );
};
