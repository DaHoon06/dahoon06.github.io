import { useRouter } from "next/router";
import styles from "./Category.module.scss";

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
        <button
            className={styles.category}
            type="button"
            onClick={() => handleClick(children)}
        >
            {children}
        </button>
    );
};
