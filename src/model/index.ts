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
    role: UserRole
}

export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: number;
    id: number;
};



export type UserRole = "admin" | undefined


export type GrowEvent = { 
    date: Date;
    id: number;
    title: string;
    description: string;
    mandatory: boolean;
    location?: string;
    sq_mandatory?: boolean;
}
