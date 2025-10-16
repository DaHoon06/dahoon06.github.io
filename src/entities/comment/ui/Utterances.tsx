import { CONFIG } from "@root/site.config";
import { useEffect } from "react";
import styled from "styled-components";
import { useScheme } from "@entities/notion/hooks/useScheme";

type Props = {
    issueTerm: string;
    preferredTheme?: "light" | "dark";
};

const Utterances: React.FC<Props> = ({ issueTerm, preferredTheme }) => {
    const [scheme] = useScheme();

    useEffect(() => {
        const theme = preferredTheme
            ? `github-${preferredTheme}`
            : `github-${scheme}`;
        const anchor = document.getElementById("comments");
        if (!anchor) return;

        const container = document.createElement("div");
        anchor.replaceChildren(container);

        const script = document.createElement("script");
        script.src = "https://utteranc.es/client.js";
        script.crossOrigin = "anonymous";
        script.async = true;
        script.setAttribute("issue-term", issueTerm);
        script.setAttribute("theme", theme);

        const config: Record<string, string> = CONFIG.utterances.config;
        Object.keys(config).forEach((key) => {
            script.setAttribute(key, config[key] || "");
        });

        container.appendChild(script);

        return () => {
            anchor.replaceChildren();
        };
    }, [scheme, issueTerm, preferredTheme]);

    return (
        <>
            <StyledWrapper id="comments">
                <div className="utterances-frame" />
            </StyledWrapper>
        </>
    );
};

export default Utterances;

const StyledWrapper = styled.div`
    @media (min-width: 768px) {
        margin-left: -4rem;
    }
`;
