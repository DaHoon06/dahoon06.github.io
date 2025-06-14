import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<PageProps = {}> = NextPage<PageProps> & {
    getLayout?: (page: ReactElement) => ReactNode;
};
