import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: number;
};

export type ProfileDto = {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    phone: string;
    studies: string;
    university: string;
    homeland: string;
}

export type Profile = Omit<ProfileDto, 'first_name' | 'last_name'> & {
    firstName: string;
    lastName: string;
}

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type Consumer<T> = (value: T) => void