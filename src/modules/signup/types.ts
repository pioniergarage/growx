import { Gender } from "modules/profile/types";

export type PersonalInfo = {
    forename: string;
    surname: string;
    gender: Gender;
    phone: string;
    country: string;
};


export type StudentInformation = {
    university: string;
    sq: boolean;
    university_country: string;
}