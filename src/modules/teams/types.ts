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
