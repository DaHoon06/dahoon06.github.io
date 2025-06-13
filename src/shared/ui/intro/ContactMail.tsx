import { ReactElement } from "react";
import styled from "styled-components";
import { IoMailOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

export const ContactMailLayout = styled.div`
  position: absolute;
  bottom: 0;
  right: 10%;
  z-index: 999;
  transform: rotate(90deg);
  transform-origin: bottom right;
  color: #b9b9b9;
  font-weight: 400;

  .contact-mail {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      color: #b9b9b9;
    }
  }

  .contact-mail-floating-button {
    display: none;
  }

  @media screen and (max-width: 767px) {
    transform: inherit;
    bottom: 20%;
    right: 5%;

    .contact-mail {
      display: none;
    }

    .contact-mail-floating-button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: white;
      box-shadow: 0px 4px 6px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

export const Line = styled.div`
  flex-grow: 0;
  height: 2px;
  background-color: #b9b9b9;
  margin-left: 10px;
  width: 150px;
  z-index: 999;
`;

const MAIL = "dahoon226@gmail.com";

export const ContactMail = (): ReactElement => {
  return (
    <ContactMailLayout>
      <Tooltip id="mail" />

      <div
        data-tooltip-id="mail"
        data-tooltip-content={MAIL}
        className="contact-mail"
      >
        <a href={`mailto:${MAIL}`}>{MAIL}</a>
        <Line />
      </div>

      <div
        className="contact-mail-floating-button"
        data-tooltip-id="mail"
        data-tooltip-content={MAIL}
      >
        <IoMailOutline size={24} color="#2d2d2d" />
      </div>
    </ContactMailLayout>
  );
};
