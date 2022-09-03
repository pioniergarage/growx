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
    type: number;
    id: number;
};

export type UserRole = 'PARTICIPANT' | 'BUDDY' | 'MENTOR' | 'EXPERT' | 'ORGA';

export type GrowEvent = {
    date: Date;
    id: number;
    title: string;
    description: string;
    mandatory: boolean;
    location?: string;
    sq_mandatory?: boolean;
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
