import React, { ReactNode } from "react";
import { Noto_Color_Emoji } from "next/font/google";
import styled from "styled-components";

const notoColorEmoji = Noto_Color_Emoji({
  weight: ["400"],
  subsets: ["emoji"],
  fallback: ["Apple Color Emoji"],
});

const EmojiWrapper = styled.span`
  font-family: ${notoColorEmoji.style.fontFamily};
`;

type Props = {
  className?: string;
  children?: ReactNode;
};

export const Emoji = ({ className, children }: Props) => {
  return <EmojiWrapper className={className}>{children}</EmojiWrapper>;
};
