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
