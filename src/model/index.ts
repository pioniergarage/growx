export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Profile = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    studies?: string;
    university?: string;
    homeland?: string;
    gender?: Gender;
    role: UserRole;
    avatar?: string;
    skills: string[];
};

export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: 'BRONZE' | 'SILVER' | 'GOLD' | 'FLAGSHIP';
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
    type?: EventType;
};

export type Team = {
    id: number;
    name: string;
    description: string;
    tags: string[];
    logo?: string;
    archived: boolean;
    requestSupport: string[];
};

export const availableSkills = [
    'AgriTech',
    'Blockchain',
    'Finance',
    'IT Security',
    'Data',
    'Cloud',
    'Software',
    'Physics',
    'Energy',
    'Hydrogen',
    'Product Design',
    'Sustainability',
    'UX/UI',
    'Smart Home',
    'Hardware',
    'CAD',
    'Social Entrepreneurship',
    'HR',
    'Life Sciences',
    'Healthcare',
    'Consumer Goods',
    'AI',
    'Ideation',
    'Customer Development',
    'Sales',
    'Marketing',
    'Finances',
    'Validation',
    'Pitching',
    'Branding',
    'Prototyping',
    'Market Research',
    'Legal',
];

export type FAQ = {
    question: string;
    answer: string;
};
