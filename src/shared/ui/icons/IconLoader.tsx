import { HTMLAttributes, ReactElement, ReactNode } from "react";
import { tv } from "tailwind-variants";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const IconStyle = tv({
    base: "flex items-center justify-center",
});

export const IconLoader = ({
    children,
    className,
    ...props
}: IconProps): ReactElement => {
    return (
        <div className={IconStyle({ className })} {...props}>
            {children}
        </div>
    );
};
