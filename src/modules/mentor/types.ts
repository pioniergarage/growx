import { Profile } from "modules/profile/types";


export type MentorAssignments = Record<number, Profile>;

export type PublicMentorProfile = Pick<
    Profile,
    'userId' | 'firstName' | 'lastName' | 'avatar' | 'bio'
>;
