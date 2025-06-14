import { CONFIG } from "@root/site.config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";
import { notionQueryKeys } from "../model/queries/queryKeys";

export type SchemeType = "light" | "dark";

type SetScheme = (scheme: SchemeType) => void;

export const useScheme = (): [SchemeType, SetScheme] => {
    const queryClient = useQueryClient();
    const followsSystemTheme = CONFIG.blog.scheme === "system";

    const { data } = useQuery({
        queryKey: notionQueryKeys.scheme(),
        queryFn: () => {
            const cachedScheme = getCookie("scheme") as SchemeType;
            return cachedScheme || followsSystemTheme
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : (CONFIG.blog.scheme as SchemeType);
        },
        enabled: false,
        initialData: followsSystemTheme
            ? "dark"
            : (CONFIG.blog.scheme as SchemeType),
    });

    const setScheme = (scheme: SchemeType) => {
        setCookie("scheme", scheme);

        queryClient.setQueryData(notionQueryKeys.scheme(), scheme);
    };

    useEffect(() => {
        if (!window) return;

        const cachedScheme = getCookie("scheme") as SchemeType;
        const defaultScheme = followsSystemTheme
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            : data;
        setScheme(cachedScheme || defaultScheme);
    }, []);

    return [data, setScheme];
};
