import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@shared/ui/Logo";

export const ProgressBarLayout = styled(motion.header)`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    z-index: 40;
    background-color: #2d2d2d;
    display: flex;
    align-items: center;
    padding: 1em 2em;
    color: white;
    transition: 0.5s ease-out;

    @media screen and (max-width: 767px) {
        padding: 1em;
    }
`;

const ProgressLists = styled.ul`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    .active {
        border-bottom: 1px solid #ff7101;

        .dot {
            font-weight: 700;
            color: #ff7101;
        }
    }

    .unactive {
        font-weight: 400;
        color: #484848;
        border-bottom: 1px solid transparent;

        .dot {
            font-weight: 400;
            color: #484848;
        }
    }
`;

export const ProgressBar = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <ProgressBarLayout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                        opacity: isVisible ? 1 : 0,
                        y: isVisible ? 0 : -20,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href={"/"}>
                        <Logo />
                    </Link>
                    <ProgressLists>
                        <li className={"active"}>
                            About
                            <span className={"dot"}>.</span>
                        </li>
                        <li className={"unactive"}>
                            Skill
                            <span className={"dot"}>.</span>
                        </li>
                        <li className={"unactive"}>
                            Project
                            <span className={"dot"}>.</span>
                        </li>
                        <li className={"unactive"}>
                            Contact
                            <span className={"dot"}>.</span>
                        </li>
                    </ProgressLists>
                </ProgressBarLayout>
            )}
        </AnimatePresence>
    );
};
