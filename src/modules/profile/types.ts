import { Database } from "database/DatabaseDefition";

export type Gender = Database["public"]["Enums"]["gender"]

export type Profile = Omit<Database["public"]["Tables"]["profile"]["Row"], "inserted_at">
export const getFullName = (person?: Partial<Pick<Profile, "forename" | "surname">>) => `${person?.forename} ${person?.surname}`

export type ContactInformation = Database["public"]["Tables"]["contact_information"]["Row"]

export type UserRole = Profile["type"]

export type FurtherProfileInfo = Omit<Database["public"]["Tables"]["signup_info"]["Row"], "created_at">

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

