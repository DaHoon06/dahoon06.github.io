import { ReactElement } from "react";
import { styled } from "styled-components";

const BackgroundLayout = styled.div`
  position: absolute;
  z-index: 1;
  min-width: 100vw;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-image: url("/images/cover.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
`;

export const Background = (): ReactElement => {
  return <BackgroundLayout />;
};
