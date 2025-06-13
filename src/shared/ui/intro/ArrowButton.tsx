import { ReactElement } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useUtilityStore from "shared/store/utilityStore";
import styled from "styled-components";

const ArrowButtonLayout = styled.button`
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10%;
`;

const Arrow = styled.span`
    background: transparent;
    border: none;
    cursor: pointer;
    height: 20px;
    outline: none;
    align-self: center;
    font-size: 2rem;
    color: white;
    animation: bounce 2s infinite;

    @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;

export const ArrowButton = (): ReactElement => {
    const { setScrollTo } = useUtilityStore();

    return (
        <ArrowButtonLayout onClick={() => setScrollTo(0)} type="button">
            <Arrow>
                <IoIosArrowDown color="white" />
            </Arrow>
            <Arrow>
                <IoIosArrowDown color="white" />
            </Arrow>
        </ArrowButtonLayout>
    );
};
