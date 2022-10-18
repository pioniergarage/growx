import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from 'database/DatabaseDefition';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import QUERY_KEYS from 'utils/queryKeys';
import teamApi from './api';
import { Team } from './types';

export function useTeamIdOfUser(userId?: string) {
    const supabaseClient = useSupabaseClient<Database>()
    const result = useQuery(
        QUERY_KEYS.currentTeam(),
        async () => {
            if (!userId) {
                throw new Error('Cannot get team of undefined user');
            }
            const teamId = await teamApi.getTeamIdOfUser(supabaseClient, userId);
            return teamId;
        },
        {
            enabled: !!userId,
        }
    );
    return { ...result, teamId: result.data };
}

export function useAllTeams(initialData?: Team[]) {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const query = useQuery<Team[], string>(QUERY_KEYS.teams(), () => teamApi.getTeams(supabaseClient,), {
        initialData: initialData,
        onSuccess: (teams) =>
            teams.forEach((team) => {
                queryClient.setQueryData(QUERY_KEYS.team(team.id), team);
            }),
    });
    return { ...query, teams: query.data };
}

export function useTeam(teamId?: number | null, initialData?: Team) {
    const supabaseClient = useSupabaseClient<Database>()
    const query = useQuery(
        QUERY_KEYS.team(teamId || undefined),
        () => {
            if (!teamId) {
                throw new Error('Cannot fetch undefined team');
            }
            return teamApi.getTeam(supabaseClient, teamId);
        },
        { enabled: !!teamId, initialData }
    );
    return { ...query, team: query.data };
}

export function useTeamMembers(teamId: number) {
    const supabaseClient = useSupabaseClient<Database>()
    const query = useQuery(QUERY_KEYS.teamMembers(teamId), () => teamApi.getTeamMembers(supabaseClient, teamId));
    return { ...query, members: query.data };
}

export function useTeamRequests(teamId: number) {
    const supabaseClient = useSupabaseClient<Database>()
    const query = useQuery(
        QUERY_KEYS.teamRequestsOfTeam(teamId),
        () => teamApi.getRequestsToTeam(supabaseClient, teamId),
        { initialData: [] }
    );
    return { ...query, profiles: query.data };
}

export function useCurrentRequest(userId?: string) {
    const supabaseClient = useSupabaseClient<Database>()
    const query = useQuery(
        QUERY_KEYS.currentRequestToTeam(),
        () => {
            if (!userId) {
                throw new Error('Cannot get request of undefined userId');
            }
            return teamApi.getTeamRequestedToJoin(supabaseClient, userId);
        },
        { enabled: !!userId }
    );
    return { ...query, request: query.data };
}

export function useAcceptRequest() {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (joiningUserId: string) => teamApi.acceptRequestToJoinTeam(supabaseClient, joiningUserId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_KEYS.teamMembers());
                queryClient.invalidateQueries(QUERY_KEYS.teamRequestsOfTeam());
            },
        }
    );
    return { ...mutation, acceptRequest: mutation.mutateAsync };
}

export function useDeclineRequest() {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (joiningUserId: string) => teamApi.declineRequestToJoinTeam(supabaseClient, joiningUserId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_KEYS.teamRequestsOfTeam());
            },
        }
    );
    return { ...mutation, declineRequest: mutation.mutateAsync };
}

export function useUploadTeamLogo() {
    const supabaseClient = useSupabaseClient<Database>()
    const { updateTeam } = useUpdateTeam();
    const mutation = useMutation(
        ({ team, file }: { team: Team; file: File }) =>
            teamApi.uploadTeamLogo(supabaseClient, team, file),
        {
            onSuccess: (publicUrl, { team }) => {
                updateTeam({ ...team, logo: publicUrl });
            },
        }
    );
    return { ...mutation, uploadTeamLogo: mutation.mutateAsync };
}

export function useRemoveTeamLogo() {
    const supabaseClient = useSupabaseClient<Database>()
    const { updateTeam } = useUpdateTeam();
    const mutation = useMutation(
        ({ team }: { team: Team }) => teamApi.removeTeamLogo(supabaseClient, team),
        {
            onSuccess: (_, { team }) => {
                updateTeam({ ...team, logo: '' });
            },
        }
    );
    return { ...mutation, removeTeamLogo: mutation.mutateAsync };
}

export function useRequestToJoinTeam() {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ userId, teamId }: { userId: string; teamId: number }) =>
            teamApi.requestToJoinTeam(supabaseClient, userId, teamId),
        {
            onSuccess: (_, { teamId }) => {
                queryClient.invalidateQueries(QUERY_KEYS.teamRequestsOfTeam(teamId));
                queryClient.invalidateQueries(QUERY_KEYS.currentRequestToTeam());
            },
        }
    );
    return { ...mutation, makeRequest: mutation.mutateAsync };
}

export function useWithdrawRequest() {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ userId }: { userId: string }) => teamApi.withdrawRequest(supabaseClient, userId),
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
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation((team: Partial<Team>) => teamApi.createTeam(supabaseClient, team), {
        onSuccess: (created) => {
            queryClient.setQueryData(QUERY_KEYS.team(created.id), created);
        },
    });
    return { ...mutation, createTeam: mutation.mutateAsync };
}

export function useUpdateTeam() {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation((team: Partial<Team>) => teamApi.updateTeam(supabaseClient, team), {
        onSuccess: (created) => {
            queryClient.setQueryData(QUERY_KEYS.team(created.id), created);
        },
    });
    return { ...mutation, updateTeam: mutation.mutateAsync };
}

export function useLeaveTeam() {
    const supabaseClient = useSupabaseClient<Database>()
    const queryClient = useQueryClient();
    const mutation = useMutation((userId: string) => teamApi.leaveTeam(supabaseClient, userId), {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEYS.teamMembers());
            queryClient.invalidateQueries(QUERY_KEYS.currentTeam());
        },
    });
    return { ...mutation, leaveTeam: mutation.mutateAsync };
}
