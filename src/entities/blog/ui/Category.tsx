import { useRouter } from "next/router";

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
        <div>
            <button onClick={() => handleClick(children)}>{children}</button>
        </div>
    );
};
