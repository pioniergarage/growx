
export type Sponsor = {
    name: string;
    logo: string;
    link: string;
    type: 'BRONZE' | 'SILVER' | 'GOLD' | 'FLAGSHIP' | 'SUPPORTER' | 'PATRON';
    id: number;
};
