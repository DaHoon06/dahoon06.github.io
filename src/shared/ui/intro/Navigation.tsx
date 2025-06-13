import { ReactElement } from "react";
import styled from "styled-components";
import Link from "next/link";
import { GitHubIcon } from "../icons";

const NavigationLayout = styled.header`
  z-index: 10;
  position: absolute;
  right: 10%;
  top: 4%;

  nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 26px;

    li {
      padding: 0.2em;
      border-bottom: 3px solid black;
    }
  }
`;

const GitHubLink = "https://github.com/DaHoon06";

export const Navigation = (): ReactElement => {
  return (
    <NavigationLayout>
      <nav>
        <ul>
          <li>
            <Link href={GitHubLink}>
              <GitHubIcon />
              GitHub.
            </Link>
          </li>
          <li>Blog.</li>
        </ul>
      </nav>
    </NavigationLayout>
  );
};
