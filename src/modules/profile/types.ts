import { Database } from "database/DatabaseDefition";

export type Gender = Database["public"]["Enums"]["gender"]

export type Profile = Database["public"]["Tables"]["profile"]["Row"]

export type ContactInformation = Database["public"]["Tables"]["contact_information"]["Row"]

export type UserRole = Database["public"]["Enums"]["user_role"]

export type FurtherProfileInfo = Database["public"]["Tables"]["signup_info"]["Row"]

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

