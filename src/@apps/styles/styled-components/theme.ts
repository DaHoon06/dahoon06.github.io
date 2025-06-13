import { DefaultTheme } from "styled-components";

const colors = {
  primary: "var(--primary)",
  bg: {
    primary: "var(--bg)",
  },
  dark: {
    primary: "#778C86",
    white: "#fff",
    gray: {
      c000: "#A6A6A6",
      c200: "#D6D6D6",
    },
    bg: "#383838",
    black: {
      c100: "#222222",
      c200: "#282828",
    },
    warning: "#FF533B",
  },
  light: {
    primary: "#00C7AE",
    white: "#fff",
    gray: {
      c100: "#C6C6C6",
      c200: "#D6D6D6",
      c300: "#D9D9D9",
      c400: "#EFEFEF",
      c500: "#989898",
    },
    bg: "#fff",
    black: {
      c100: "#000000",
      c200: "#444343",
    },
    warning: "#FF5050",
  },
};

const scroll = {
  theme: () => `
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #cdcdcd;
      border-radius: 0;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    
    @media screen and (max-width: 768px) {
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  `,
};

export interface MediaQueryTheme {
  custom: (width: number) => string;
  mobile: string;
  tablet: string;
  pc: string;
}

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

const media: MediaQueryTheme = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};

export const theme: DefaultTheme = {
  colors,
  media,
  scroll,
} as const;
