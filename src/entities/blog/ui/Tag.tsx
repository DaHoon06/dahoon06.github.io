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
            className="text-[.8rem] font-normal text-white rounded-md p-1 cursor-pointer transition-colors duration-200 bg-[#ff7337] hover:bg-gray-200 hover:text-primary-000"
            type="button"
            onClick={() => handleClick(children)}
        >
            {children}
        </button>
    );
};
