import styled, { keyframes, css } from "styled-components";
import { useEffect, useState } from "react";

const slideToLeft = keyframes`
  0% {
    opacity: 1;
    transform: translate(50%, 50%); 
  }
  100% {
    opacity: 1;
    transform: translate(0%, 0%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 1;
    transform: translate(50%, 50%);
  }
`;

export const IntroMessageBoxLayout = styled.div<{ $isSlid: boolean }>`
  z-index: 30;
  opacity: 1;
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  .title {
    stroke: rgba(0, 0, 0, 0.4);
    font-weight: bold;
    font-size: 2.25em;
    transition: 0.5s ease-in;

    .accent {
      color: #ff7101;
    }
  }

  @media screen and (max-width: 767px) {
    .title {
      font-size: 1.5em;
    }
  }
`;

export const IntroMessageBox = () => {
  const [isSlid, setIsSlid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSlid(true);
    }, 1000);

    const typingTimer = setTimeout(() => {}, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(typingTimer);
    };
  }, []);

  useEffect(() => {
    if (isSlid) {
      setTimeout(() => {
        const typingText = document.querySelector(
          ".typing-text"
        ) as HTMLElement;
        if (typingText) {
          typingText.style.opacity = "1";
        }
      }, 1000);
    }
  }, [isSlid]);

  return (
    <IntroMessageBoxLayout $isSlid={isSlid}>
      <p className={"title"}>
        안녕하세요. 프론트엔드 엔지니어 <span className={"accent"}>전다훈</span>
        입니다.
      </p>
      <p>저의 웹 포트폴리오에 방문해주셔서 진심으로 감사드립니다.</p>
      <p>저에대해 좀 더 궁금하시다면 스크롤을 내려주세요.</p>
    </IntroMessageBoxLayout>
  );
};
