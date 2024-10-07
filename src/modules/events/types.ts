export enum EventType {
    Online = 'Online',
    Offline = 'Offline',
    Hybrid = 'Hybrid',
}

export enum EventCategory {
    Grow = 'GROW',
    Workshop = 'Workshop',
    Info = 'Info Session',
}

export type GrowEvent = {
    id: number;
    ref?: string;
    location: string;
    title: string;
    date: Date;
    description?: string;
    mandatory?: boolean;
    type?: EventType;
    duration: number;
    availableSeats: number;
    eventCategory: EventCategory;
};

export type GrowEventWithSeats = GrowEvent & {
    presenceSeatsLeft: number;
};
