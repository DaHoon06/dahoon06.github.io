import cn from "@shared/libs/cn";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputVariants = cva(
    "focus:border-gray-400 focus:bg-white text-lg border-gray-200 text-gray-800 placeholder-gray-400 w-full rounded-md border px-3 py-1.5 transition-all duration-200 outline-none min-h-[36px]",
    {
        variants: {
            variant: {
                default: "",
            },
        },
    }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type, className, disabled, ...props }, ref) => {
        return (
            <input
                type={type}
                disabled={disabled}
                className={cn(
                    inputVariants({ variant: "default" }),
                    disabled &&
                        "disabled:bg-gray-100 disabled:text-gray-400 disabled:placeholder-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed disabled:opacity-100",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export default Input;
