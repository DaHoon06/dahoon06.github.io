import { useRouter } from "next/router";
import { MdExpandMore } from "react-icons/md";
import styles from "./CategorySelect.module.scss";
import { useCategoriesQuery } from "@entities/blog/posts/services/useCategoriesQuery";
import useDropdown from "@entities/blog/posts/hooks/useDropdown";

export const CategorySelect = () => {
    const router = useRouter();
    const data = useCategoriesQuery();
    const [dropdownRef, opened, handleOpen] = useDropdown();
    const currentCategory = `${router.query.category || ``}` || "📂 All";

    const handleOptionClick = (category: string) => {
        const updatedQuery = { ...router.query };

        if ("tag" in updatedQuery) {
            delete updatedQuery.tag;
        }

        updatedQuery.category = category;

        router.push({
            query: updatedQuery,
        });
    };

    return (
        <div className={styles.categorySelect}>
            <div
                ref={dropdownRef}
                className={styles.wrapper}
                onClick={handleOpen}
            >
                {currentCategory} Posts <MdExpandMore />
            </div>
            {opened && (
                <div className={styles.content}>
                    {Object.keys(data).map((key, idx) => (
                        <div
                            className={styles.item}
                            key={idx}
                            onClick={() => handleOptionClick(key)}
                        >
                            {`${key} (${data[key]})`}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
