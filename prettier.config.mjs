/** @type {import("prettier").Config} */
const config = {
  plugins: [],
  singleQuote: true,
  semi: true,
  arrowParens: "always",
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 4,
  ignorePath: ".prettierignore",
};

export const prettierConfig = config;
