import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "database/DatabaseDefition";
import { Profile } from "modules/profile/types";
import { Team } from "modules/teams/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "utils/queryKeys";
import mentorApi from "./api";
import { MentorAssignments } from "./types";

export function useMentorAssignments() {
    const supabaseClient = useSupabaseClient<Database>()
    const query = useQuery(QUERY_KEYS.mentorAssignments(), () => mentorApi.getMentorAssignments(supabaseClient));
    return { ...query, mentorAssignments: query.data };
}

export function useTeamMentor(teamId: number) {
    const supabaseClient = useSupabaseClient<Database>()
    const query = useQuery(QUERY_KEYS.teamMentor(), () => mentorApi.getTeamMentor(supabaseClient, teamId));
    return { ...query, mentor: query.data };
}

export function useAssignMentor() {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({
            teamId,
            mentorId,
        }: {
            teamId: Team['id'];
            mentorId: Profile['user_id'];
        }) => mentorApi.assignMentor(supabaseClient, teamId, mentorId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_KEYS.mentorAssignments());
            },
        }
    );
    return { ...mutation, assignMentor: mutation.mutateAsync };
}

export function useUnassignMentor() {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ teamId }: { teamId: Team['id'] }) => mentorApi.unassignMentor(supabaseClient, teamId),
        {
            onSuccess: (deleted) => {
                const newData =
                    queryClient.getQueryData<MentorAssignments>(
                        QUERY_KEYS.mentorAssignments()
                    ) ?? {};
                delete newData[deleted.team];
                queryClient.setQueryData('mentorAssignments', newData);
            },
        }
    );
    return { ...mutation, unassignMentor: mutation.mutateAsync };
}
