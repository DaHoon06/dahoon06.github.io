import { Logo } from "@shared/ui/Logo";
import ThemeToggle from "@shared/ui/toggle/ThemeToggle";
import Link from "next/link";
import { ReactElement } from "react";
import { styled } from "styled-components";

const StyledWrapper = styled.header`
    z-index: 10;
    position: sticky;
    top: 0;
    background-color: rgba(45, 45, 45, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1000px;
        height: 100%;
        margin: 0 auto;
        &[data-full-width="true"] {
            @media (min-width: 768px) {
            }
        }
        .nav {
            display: flex;
            gap: 0.75rem;
            align-items: center;
        }
    }
`;

type HeaderProps = {
    fullWidth: boolean;
};

export const Header = ({ fullWidth }: HeaderProps): ReactElement => {
    return (
        <StyledWrapper>
            <div data-full-width={fullWidth} className="container">
                <Link href={"/"}>
                    <Logo />
                </Link>
                <div className="nav">
                    <ThemeToggle />
                    {/* <NavBar /> */}
                </div>
            </div>
        </StyledWrapper>
    );
};
