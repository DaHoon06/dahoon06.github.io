import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import styles from "./SearchInput.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const SearchInput: React.FC<Props> = forwardRef(
    ({ label, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
        return (
            <label className={styles.inputLabel}>
                {label && <span className={styles.label}>{label}</span>}
                <input
                    ref={ref}
                    className={styles.input}
                    type="text"
                    placeholder="Search..."
                    {...props}
                />
            </label>
        );
    }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
