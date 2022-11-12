export type Team = {
    id: number;
    name: string;
    description: string;
    tags: string[];
    logo: string | null;
    archived: boolean;
    requestSupport: string[];
    mentor?: string;
};

export type TeamWithMembers = {
    id: number;
    name: string;
    logo?: string;
    isArchived: boolean;
    requestSupport: string[];
    members: {
        userId: string;
        firstName: string;
        lastName: string;
    }[];
};
