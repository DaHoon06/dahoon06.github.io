import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
} from "react";
import styled from "styled-components";

interface FlexProps {
  $flexDirection?: CSSProperties["flexDirection"];
  $justifyContent?: CSSProperties["justifyContent"];
  $alignItems?: CSSProperties["alignItems"];
  $flexWrap?: CSSProperties["flexWrap"];
  $gap?: string | number;
  $width?: string | number;
}

export const FlexBoxLayout = styled.div<FlexBoxProps>`
  display: flex;
  width: ${({ $width }) => (!$width ? "100" : $width)}%;
  height: auto;
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  flex-wrap: ${({ $flexWrap }) => $flexWrap};
  gap: ${({ $gap }) => $gap}px;
`;

export interface FlexBoxProps
  extends FlexProps,
    HTMLAttributes<HTMLDivElement> {}

const FlexBox = forwardRef(
  (
    {
      children,
      $flexDirection = "column",
      $justifyContent = "center",
      $alignItems = "center",
      $flexWrap = "wrap",
      $gap = "0",
      $width = "100",
      ...rest
    }: PropsWithChildren<FlexBoxProps>,
    forwardRef: Ref<HTMLDivElement>
  ) => {
    return (
      <FlexBoxLayout
        ref={forwardRef}
        $flexWrap={$flexWrap}
        $flexDirection={$flexDirection}
        $justifyContent={$justifyContent}
        $alignItems={$alignItems}
        $gap={$gap}
        $width={$width}
        {...rest}
      >
        {children}
      </FlexBoxLayout>
    );
  }
);

export default FlexBox;
FlexBox.displayName = "FlexBox";
