import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from 'database/DatabaseDefition';
import {
    acceptRequestToJoinTeam,
    createTeam,
    declineRequestToJoinTeam,
    getRequestsToTeam,
    getTeam,
    getTeamIdOfUser,
    getTeamMembers,
    getTeamRequestedToJoin,
    getTeams,
    leaveTeam,
    removeTeamLogo,
    requestToJoinTeam,
    updateTeam,
    uploadTeamLogo,
    withdrawRequest,
} from 'modules/teams/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Team } from './types';

export function useTeamIdOfUser(userId?: string) {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery(
        'currentTeamId',
        async () => {
            if (!userId) {
                throw new Error('Cannot get team of undefined user');
            }
            const teamId = await getTeamIdOfUser(supabaseClient, userId);
            return teamId;
        },
        {
            enabled: !!userId,
        }
    );
    return { ...result, teamId: result.data };
}

export function useAllTeams(initialData?: Team[]) {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const query = useQuery<Team[], string>(
        'teams',
        () => getTeams(supabaseClient),
        {
            initialData: initialData,
            onSuccess: (teams) =>
                teams.forEach((team) => {
                    queryClient.setQueryData(['team', team.id], team);
                }),
        }
    );
    return { ...query, teams: query.data };
}

export function useTeam(teamId?: number | null, initialData?: Team) {
    const supabaseClient = useSupabaseClient<Database>();
    const query = useQuery(
        ['team', teamId],
        () => {
            if (!teamId) {
                throw new Error('Cannot fetch undefined team');
            }
            return getTeam(supabaseClient, teamId);
        },
        { enabled: !!teamId, initialData }
    );
    return { ...query, team: query.data };
}

export function useTeamMembers(teamId: number) {
    const supabaseClient = useSupabaseClient<Database>();
    const query = useQuery(['members', teamId], () =>
        getTeamMembers(supabaseClient, teamId)
    );
    return { ...query, members: query.data };
}

export function useTeamRequests(teamId: number) {
    const supabaseClient = useSupabaseClient<Database>();
    const query = useQuery(
        ['teamRequests', teamId],
        () => getRequestsToTeam(supabaseClient, teamId),
        { initialData: [] }
    );
    return { ...query, profiles: query.data };
}

export function useCurrentRequest(userId?: string) {
    const supabaseClient = useSupabaseClient<Database>();
    const query = useQuery(
        'currentTeamRequest',
        () => {
            if (!userId) {
                throw new Error('Cannot get request of undefined userId');
            }
            return getTeamRequestedToJoin(supabaseClient, userId);
        },
        { enabled: !!userId }
    );
    return { ...query, request: query.data };
}

export function useAcceptRequest() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (joiningUserId: string) =>
            acceptRequestToJoinTeam(supabaseClient, joiningUserId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('members');
                queryClient.invalidateQueries('teamRequests');
            },
        }
    );
    return { ...mutation, acceptRequest: mutation.mutateAsync };
}

export function useDeclineRequest() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (joiningUserId: string) =>
            declineRequestToJoinTeam(supabaseClient, joiningUserId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('teamRequests');
            },
        }
    );
    return { ...mutation, declineRequest: mutation.mutateAsync };
}

export function useUploadTeamLogo() {
    const supabaseClient = useSupabaseClient<Database>();
    const { updateTeam } = useUpdateTeam();
    const mutation = useMutation(
        ({ team, file }: { team: Team; file: File }) =>
            uploadTeamLogo(supabaseClient, team, file),
        {
            onSuccess: (publicUrl, { team }) => {
                const timestamp = Date.now();
                updateTeam({ ...team, logo: publicUrl + '?r=' + timestamp });
            },
        }
    );
    return { ...mutation, uploadTeamLogo: mutation.mutateAsync };
}

export function useRemoveTeamLogo() {
    const supabaseClient = useSupabaseClient<Database>();
    const { updateTeam } = useUpdateTeam();
    const mutation = useMutation(
        ({ team }: { team: Team }) => removeTeamLogo(supabaseClient, team),
        {
            onSuccess: (_, { team }) => {
                updateTeam({ ...team, logo: '' });
            },
        }
    );
    return { ...mutation, removeTeamLogo: mutation.mutateAsync };
}

export function useRequestToJoinTeam() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ userId, teamId }: { userId: string; teamId: number }) =>
            requestToJoinTeam(supabaseClient, userId, teamId),
        {
            onSuccess: (_, { teamId }) => {
                queryClient.invalidateQueries(['teamRequests', teamId]);
                queryClient.invalidateQueries('currentTeamRequest');
            },
        }
    );
    return { ...mutation, makeRequest: mutation.mutateAsync };
}

export function useWithdrawRequest() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ userId }: { userId: string }) =>
            withdrawRequest(supabaseClient, userId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['teamRequests', undefined]);
                queryClient.invalidateQueries('currentTeamRequest');
            },
        }
    );
    return { ...mutation, withdrawRequest: mutation.mutateAsync };
}

export function useCreateTeam() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (team: Partial<Team>) => createTeam(supabaseClient, team),
        {
            onSuccess: (created) => {
                queryClient.setQueryData(['team', created.id], created);
            },
        }
    );
    return { ...mutation, createTeam: mutation.mutateAsync };
}

export function useUpdateTeam() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (team: Partial<Team>) => updateTeam(supabaseClient, team),
        {
            onSuccess: (created) => {
                queryClient.setQueryData(['team', created.id], created);
            },
        }
    );
    return { ...mutation, updateTeam: mutation.mutateAsync };
}

export function useLeaveTeam() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (userId: string) => leaveTeam(supabaseClient, userId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['members']);
                queryClient.invalidateQueries('currentTeamId');
            },
        }
    );
    return { ...mutation, leaveTeam: mutation.mutateAsync };
}
