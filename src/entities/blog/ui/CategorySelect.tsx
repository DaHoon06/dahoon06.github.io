import { useRouter } from "next/router";
import { useCategoriesQuery } from "../services/useCategoriesQuery";
import useDropdown from "../hooks/useDropdown";
import { MdExpandMore } from "react-icons/md";
import { StyledWrapper } from "./CategorySelect.styled";

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
        <StyledWrapper>
            <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
                {currentCategory} Posts <MdExpandMore />
            </div>
            {opened && (
                <div className="content">
                    {Object.keys(data).map((key, idx) => (
                        <div
                            className="item"
                            key={idx}
                            onClick={() => handleOptionClick(key)}
                        >
                            {`${key} (${data[key]})`}
                        </div>
                    ))}
                </div>
            )}
        </StyledWrapper>
    );
};
