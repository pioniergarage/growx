import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: number;
};

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type Consumer<T> = (value: T) => void