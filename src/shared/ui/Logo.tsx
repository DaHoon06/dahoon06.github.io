import { ReactElement } from "react";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Logo = ({ className, ...props }: LogoProps): ReactElement => {
    return (
        <span {...props}>
            <svg
                width="28"
                height="28"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="1.5"
                    stroke="#222"
                />
                <path
                    d="M18.7402 31H11.2695V9.78906H18.8281C25.2148 9.78906 29.1113 13.7734 29.1113 20.3652C29.1113 27.0156 25.2148 31 18.7402 31ZM15.6641 27.2207H18.5645C22.6074 27.2207 24.7168 25.1113 24.7168 20.3652C24.7168 15.6484 22.6074 13.5684 18.5938 13.5684H15.6641V27.2207Z"
                    fill="#222"
                />
                <circle cx="29" cy="29" r="5" fill="#FF7101" />
            </svg>
        </span>
    );
};
