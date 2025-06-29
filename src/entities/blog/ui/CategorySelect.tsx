import { useRouter } from "next/router";
import { useCategoriesQuery } from "../services/useCategoriesQuery";
import useDropdown from "../hooks/useDropdown";
import { MdExpandMore } from "react-icons/md";
import styles from "./CategorySelect.module.scss";

export const CategorySelect = () => {
    const router = useRouter();
    const data = useCategoriesQuery();
    const [dropdownRef, opened, handleOpen] = useDropdown();
    const currentCategory = `${router.query.category || ``}` || "📂 All";

    const handleOptionClick = (category: string) => {
        router.push({
            query: {
                ...router.query,
                category,
            },
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
