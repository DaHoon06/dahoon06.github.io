import { useState, useEffect } from "react";

const useMatchMedia = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return; // SSR 방지

        const mediaQueryList = window.matchMedia(query);
        setMatches(mediaQueryList.matches);

        const handleChange = (event) => setMatches(event.matches);
        mediaQueryList.addEventListener("change", handleChange);

        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
};

export default useMatchMedia;
