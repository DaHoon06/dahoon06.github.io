import React, { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import useUtilityStore from "shared/store/utilityStore";
import { IntroScreen } from "@shared/ui/intro/IntroScreen";
import { ContactMail } from "@shared/ui/intro/ContactMail";
import Footer from "./Footer";

interface HomeLayoutProps {
  children: ReactNode;
}

const BaseContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2d2d2d;
`;

const Main = styled.main<{ $isScrolled: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: transparent;
  transition:
    transform 0.5s ease-out,
    opacity 0.5s ease-out;
  transform: ${({ $isScrolled }) =>
    $isScrolled ? "translateY(0)" : "translateY(100vh)"};
  opacity: ${({ $isScrolled }) => ($isScrolled ? 1 : 0)};
  z-index: 30;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
`;

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { isScrolled, setIsScrolled, setIsVisible, scrollTo } =
    useUtilityStore();
  const introRef = useRef<HTMLDivElement | null>(null);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = ({ target }: any) => {
    const scrollTop = target.scrollTop;
    if (scrollTop > 0) {
      setIsScrolled(true);
      if (introRef.current) {
        const contentHeight = introRef.current?.clientHeight + 50;
        setIsVisible(scrollTop > contentHeight);
      }
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll({ target: document.body });
    document.body.addEventListener("scroll", handleScroll);
    return () => document.body.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollTo !== null && screenRefs.current[scrollTo]) {
      screenRefs.current[scrollTo].scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTo]);

  return (
    <>
      <BaseContainer>
        <IntroScreen ref={introRef} />
        <Main $isScrolled={isScrolled}>
          <MainContainer>
            {React.Children.map(children, (child, index) => (
              <div
                key={index}
                ref={(el: any) => (screenRefs.current[index] = el)}
              >
                {child}
              </div>
            ))}
          </MainContainer>
        </Main>
      </BaseContainer>
      <ContactMail />
      <Footer />
    </>
  );
};
