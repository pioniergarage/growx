import { Profile } from "modules/profile/types";


export type MentorAssignments = Record<number, Profile>;

export type AssignedTeamLeads = {
    user_id: string;
    email: string;
    phone?: string;
    first_name: string;
    last_name: string;
    team_id: number;
    name: string;
}[]