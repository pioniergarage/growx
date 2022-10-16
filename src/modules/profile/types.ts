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

export type UserRole = 'PARTICIPANT' | 'BUDDY' | 'MENTOR' | 'EXPERT' | 'ORGA';

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


export type FurtherProfileInfo = {
    lookingForTeam: boolean;
    expectations: string;
    idea: string;
    source: string;
};
