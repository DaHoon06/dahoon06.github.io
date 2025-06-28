import { useRouter } from "next/router";
import React from "react";
import styles from "./Tag.module.scss";

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
            className={styles.tag}
            type="button"
            onClick={() => handleClick(children)}
        >
            {children}
        </button>
    );
};
