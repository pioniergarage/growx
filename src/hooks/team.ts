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
} from 'api/teams';
import { Team } from 'model';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useTeamIdOfUser(userId?: string) {
    const result = useQuery(
        'team',
        async () => {
            if (!userId) {
                throw new Error('Cannot get team of undefined user');
            }
            const teamId = await getTeamIdOfUser(userId);
            if (!teamId) {
                return null;
            }
        },
        {
            enabled: !!userId,
        }
    );
    return { ...result, teamId: result.data };
}

export function useAllTeams() {
    const queryClient = useQueryClient();
    const query = useQuery<Team[], string>('teams', getTeams, {
        onSuccess: (teams) =>
            teams.forEach((team) => {
                queryClient.setQueryData(['team', team.id], team);
            }),
    });
    return { ...query, teams: query.data };
}

export function useTeam(teamId: number) {
    const query = useQuery(['team', teamId], () => getTeam(teamId));
    return { ...query, team: query.data };
}

export function useTeamMembers(teamId: number) {
    const query = useQuery(['members', teamId], () => getTeamMembers(teamId));
    return { ...query, members: query.data };
}

export function useTeamRequests(teamId: number) {
    const query = useQuery(['teamRequests', teamId], () =>
        getRequestsToTeam(teamId)
    );
    return { ...query, profiles: query.data };
}

export function useCurrentRequest(userId?: string) {
    const query = useQuery(
        'currentTeamRequest',
        () => {
            if (!userId) {
                throw new Error('Cannot get request of undefined userId');
            }
            return getTeamRequestedToJoin(userId);
        },
        { enabled: !!userId }
    );
    return { ...query, request: query.data };
}

export function useAcceptRequest() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (joiningUserId: string) => acceptRequestToJoinTeam(joiningUserId),
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
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (joiningUserId: string) => declineRequestToJoinTeam(joiningUserId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('teamRequests');
            },
        }
    );
    return { ...mutation, declineRequest: mutation.mutateAsync };
}

export function useUploadTeamLogo() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ team, file }: { team: Team; file: File }) =>
            uploadTeamLogo(team, file),
        {
            onSuccess: (publicUrl, { team }) => {
                queryClient.setQueryData<Team | undefined>(
                    ['team', team.id],
                    (oldData) => {
                        if (oldData) {
                            return { ...oldData, avatar: publicUrl };
                        }
                    }
                );
            },
        }
    );
    return { ...mutation, uploadTeamLogo: mutation.mutateAsync };
}

export function useRemoveTeamLogo() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ team }: { team: Team }) => removeTeamLogo(team),
        {
            onSuccess: (_, { team }) => {
                queryClient.setQueryData<Team | undefined>(
                    ['team', team.id],
                    (oldData) => {
                        if (oldData) {
                            return { ...oldData, avatar: undefined };
                        }
                    }
                );
            },
        }
    );
    return { ...mutation, removeTeamLogo: mutation.mutateAsync };
}

export function useRequestToJoinTeam() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ userId, teamId }: { userId: string; teamId: number }) =>
            requestToJoinTeam(userId, teamId),
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
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ userId }: { userId: string }) => withdrawRequest(userId),
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
    const queryClient = useQueryClient();
    const mutation = useMutation((team: Partial<Team>) => createTeam(team), {
        onSuccess: (created) => {
            queryClient.setQueryData(['team', created.id], created);
        },
    });
    return { ...mutation, createTeam: mutation.mutateAsync };
}

export function useUpdateTeam() {
    const queryClient = useQueryClient();
    const mutation = useMutation((team: Partial<Team>) => updateTeam(team), {
        onSuccess: (created) => {
            queryClient.setQueryData(['team', created.id], created);
        },
    });
    return { ...mutation, updateTeam: mutation.mutateAsync };
}
export function useLeaveTeam() {
    const queryClient = useQueryClient();
    const mutation = useMutation((userId: string) => leaveTeam(userId), {
        onSuccess: () => {
            queryClient.invalidateQueries(['members']);
            queryClient.invalidateQueries('team');
        },
    });
    return { ...mutation, leaveTeam: mutation.mutateAsync };
}
