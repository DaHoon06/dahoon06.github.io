import styled from "styled-components";
import Link from "next/link";
import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosMenu } from "react-icons/io";
import { Logo } from "@shared/ui/Logo";

const HeaderLayout = styled(motion.header)`
    width: 100%;
    height: 80px;
    padding: 1em 2em;
    background-color: #2d2d2d;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    transition: 0.5s ease-out;

    @media screen and (max-width: 767px) {
        padding: 0.8em 1.5em;
    }
`;

const HeaderContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10%;

    nav {
        border-bottom: 1px solid #b9b9b9;
        padding-bottom: 10px;

        display: inline-block;
    }

    .hamburger-menu-button {
        display: none;
        border: 1px solid transparent;
    }

    @media screen and (max-width: 767px) {
        nav {
            display: none;
        }

        .hamburger-menu-button {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

interface StaticHeaderProps {
    isShow: boolean;
}

const NavList = [
    { label: "About" },
    { label: "Skills" },
    { label: "Project" },
    { label: "Contact" },
];

const NavLists = styled.ul`
    display: flex;
    gap: 10px;

    .step {
        font-weight: 800;
    }

    .dot {
        font-weight: 800;
        font-size: 16px;
        color: #ff7101;
    }
`;

const NavItem = styled.li`
    font-size: 16px;
    color: white;
    font-weight: 500;
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
`;

const StaticHeader = ({ isShow }: StaticHeaderProps): ReactElement => {
    return (
        <AnimatePresence>
            {isShow && (
                <HeaderLayout
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <HeaderContainer>
                        <Link href={"/"}>
                            <Logo />
                        </Link>
                    </HeaderContainer>
                    <HeaderContainer>
                        <nav>
                            <NavLists>
                                {NavList.map((value, index) => (
                                    <NavItem
                                        key={`nav_${index}_${value.label}`}
                                    >
                                        {value.label}
                                        <span className={"dot"}>.</span>
                                    </NavItem>
                                ))}
                            </NavLists>
                        </nav>
                        <button
                            type={"button"}
                            className={"hamburger-menu-button"}
                            aria-label={"hamburger-menu-button"}
                        >
                            <IoIosMenu color={"white"} size={30} />
                        </button>
                    </HeaderContainer>
                </HeaderLayout>
            )}
        </AnimatePresence>
    );
};

export default StaticHeader;
