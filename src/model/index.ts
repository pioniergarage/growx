export type Profile = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    studies: string;
    university: string;
    homeland: string;
    gender: string;
    role: UserRole;
};

export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: number;
    id: number;
};

export type UserRole = 'admin' | undefined;

export enum EventType {
    Online = 'Online',
    Offline = 'Offline',
    Hybrid = 'Hyprid',
}

/*
export function eventTypeIdToString(et: EventType) {
    switch (et) {
        case EventType.Online:
            return 'Online';
            break;
        case EventType.Offline:
            return 'Offline';
            break;
        case EventType.Hybrid:
            return 'Hybrid';
            break;

        default:
            return '';
            break;
    }
}
*/

export type GrowEvent = {
    date: Date;
    id: number;
    title: string;
    description: string;
    mandatory: boolean;
    location?: string;
    sq_mandatory?: boolean;
    //type?: { id: number; name: string };
    type?: EventType;
};
