import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: number;
    id: number;
};

export function getSponsorType(sponsor: Sponsor) {
    if (sponsor.type === 0) return 'GOLD';
    else return 'SILVER';
}

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
};

export type UserRole = 'admin' | undefined;

export type Profile = Omit<ProfileDto, 'first_name' | 'last_name'> & {
    firstName: string;
    lastName: string;
    role: UserRole;
};

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type Consumer<T> = (value: T) => void;

export type GrowEventDto = {
    id: number;
    title: string;
    date: string;
    description: string;
    online?: boolean;
    mandatory?: boolean;
    location?: string;
    type_id?: number;
    sq_mandatory?: boolean;
};

export type EventTypeDto = {
    id: number;
    type: string;
};

export type GrowEvent = Omit<GrowEventDto, 'date'> & {
    date: Date;
    type: string;
};
