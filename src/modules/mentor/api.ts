import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "database/DatabaseDefition";
import { handleResponse, handleSingleResponse } from "database/utils";
import profileApi from "modules/profile/api";
import { Profile } from "modules/profile/types";
import { Team } from "modules/teams/types";
import { MentorAssignments } from "./types";

interface MentorApi {
    getMentors: (supabaseClient: SupabaseClient<Database>) => Promise<Profile[]>
    getMentorAssignments: (supabaseClient: SupabaseClient<Database>) => Promise<MentorAssignments>
    getTeamMentor: (supabaseClient: SupabaseClient<Database>, teamId: number) => Promise<Profile>
    assignMentor: (supabaseClient: SupabaseClient<Database>,
        teamId: Team['id'],
        mentorId: Profile['user_id']
    ) => Promise<{ mentor: Profile['user_id']; team: Team['id'] }>
    unassignMentor: (supabaseClient: SupabaseClient<Database>, teamId: Team['id']) => Promise<{ mentor: Profile['user_id']; team: Team['id'] }>
}

const mentorApi: MentorApi = {
    async getMentors(supabaseClient) {
        return await profileApi.getProfilesOfType(supabaseClient, "MENTOR")
    },
    async getMentorAssignments(supabaseClient) {
        return await supabaseClient
            .from(
                'mentor_assignment'
            )
            .select('mentor (*), team')
            .then(handleResponse)
            .then((dtos) =>
                Object.assign(
                    {},
                    ...dtos.map((dto) => ({
                        [dto.team]: dto.mentor as Database['public']['Tables']['profile']['Row'],
                    }))
                )
            );
    },
    async getTeamMentor(supabaseClient, teamId) {
        return await supabaseClient
            .from(
                'mentor_assignment'
            )
            .select('mentor (*), team')
            .match({ team: teamId })
            .single()
            .then(handleSingleResponse)
            .then((dto) => dto.mentor as Database['public']['Tables']['profile']['Row']);
    },
    async assignMentor(supabaseClient, teamId, mentorId) {
        return await supabaseClient
            .from('mentor_assignment')
            .upsert(
                { mentor: mentorId, team: teamId }
            )
            .match({ mentor: mentorId, team: teamId })
            .select()
            .single()
            .then(handleSingleResponse);
    },
    async unassignMentor(supabaseClient, teamId) {
        return await supabaseClient
            .from('mentor_assignment')
            .delete()
            .match({ team: teamId })
            .select()
            .single()
            .then(handleSingleResponse);
    }

}

export default mentorApi;