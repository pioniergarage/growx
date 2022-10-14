export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Profile = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    studies?: string;
    university?: string;
    universityCountry?: string;
    homeland?: string;
    gender?: Gender;
    role: UserRole;
    avatar?: string;
    skills: string[];
    bio: string;
    keyQualification: boolean;
};

export type PublicMentorProfile = Pick<Profile, 'userId' | 'firstName' | 'lastName' | 'avatar' | 'bio'>

export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: 'BRONZE' | 'SILVER' | 'GOLD' | 'FLAGSHIP';
    id: number;
};

export type UserRole = 'PARTICIPANT' | 'BUDDY' | 'MENTOR' | 'EXPERT' | 'ORGA';
export enum EventType {
    Online = 'Online',
    Offline = 'Offline',
    Hybrid = 'Hybrid',
}

export type GrowEvent = {
    date: Date;
    id: number;
    title: string;
    description?: string;
    mandatory?: boolean;
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
    mentor?: string;
};

export type MentorAssignments = Record<number, Profile>;

export const availableSkills = [
    'AgriTech',
    'Blockchain',
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
].sort();

export type FAQ = {
    question: string;
    answer: string;
};

export type FurtherProfileInfo = {
    lookingForTeam: boolean;
    expectations: string;
    idea: string;
    source: string;
};
