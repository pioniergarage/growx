import { useSupabaseClient } from '@/components/providers/SupabaseProvider';
import { Profile } from 'modules/profile/types';
import { Team } from 'modules/teams/types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    assignMentor,
    getAssignedTeamLeads,
    getMentorAssignments,
    getTeamMentor,
    unassignMentor,
} from './api';
import { MentorAssignments } from './types';

export function useMentorAssignments() {
    const supabaseClient = useSupabaseClient();
    const query = useQuery(
        'mentorAssignments',
        () => getMentorAssignments(supabaseClient),
        {
            refetchOnWindowFocus: false,
        }
    );
    return { ...query, mentorAssignments: query.data };
}

export function useTeamMentor(teamId: number) {
    const supabaseClient = useSupabaseClient();
    const query = useQuery('teamMentor', () =>
        getTeamMentor(supabaseClient, teamId)
    );
    return { ...query, mentor: query.data };
}

export function useAssignMentor() {
    const supabaseClient = useSupabaseClient();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({
            teamId,
            mentorId,
        }: {
            teamId: Team['id'];
            mentorId: Profile['userId'];
        }) => assignMentor(supabaseClient, teamId, mentorId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('mentorAssignments');
            },
        }
    );
    return { ...mutation, assignMentor: mutation.mutateAsync };
}

export function useUnassignMentor() {
    const supabaseClient = useSupabaseClient();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ teamId }: { teamId: Team['id'] }) =>
            unassignMentor(supabaseClient, teamId),
        {
            onSuccess: (deleted) => {
                const newData =
                    queryClient.getQueryData<MentorAssignments>(
                        'mentorAssignments'
                    ) ?? {};
                delete newData[deleted.team];
                queryClient.setQueryData('mentorAssignments', newData);
            },
        }
    );
    return { ...mutation, unassignMentor: mutation.mutateAsync };
}

export function useGetAssignedTeamLeads() {
    const supabaseClient = useSupabaseClient();
    const query = useQuery('assignedTeamLeads', () =>
        getAssignedTeamLeads(supabaseClient)
    );
    return { ...query, teamLeads: query.data };
}
