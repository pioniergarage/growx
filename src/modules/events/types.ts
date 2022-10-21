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
    location: string;
    sq_mandatory?: boolean;
    type?: EventType;
};