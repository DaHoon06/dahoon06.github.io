import { ReactElement } from "react";
import styled from "styled-components";

export const ContactScreenLayout = styled.section`
  width: 100%;
  color: #222;
  padding: 2em;
  background-color: #fbfbfb;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0.8em;
  color: #333;
`;


export const ContactScreen = (): ReactElement => {
  return (
    <ContactScreenLayout>
      <Title>Contact.</Title>
    </ContactScreenLayout>
  );
};
