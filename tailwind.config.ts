import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

const tailwindConfig: Pick<
    Config,
    "content" | "presets" | "darkMode" | "theme" | "plugins"
> = {
    content: ["./src/**/*.tsx"],
    darkMode: "class",
    plugins: [tailwindAnimate, tailwindScrollbarHide],
};

export default tailwindConfig;
