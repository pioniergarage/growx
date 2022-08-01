export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: number;
};


export type Consumer<T> = (value: T) => void