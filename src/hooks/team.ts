import {
    assignMentor,
    getMentorAssignments,
    unassignMentor,
} from 'database/assignments';
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
} from 'database/teams';
import { Profile, Team } from 'model';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useTeamIdOfUser(userId?: string) {
    const result = useQuery(
        'currentTeamId',
        async () => {
            if (!userId) {
                throw new Error('Cannot get team of undefined user');
            }
            const teamId = await getTeamIdOfUser(userId);
            return teamId;
        },
        {
            enabled: !!userId,
        }
    );
    return { ...result, teamId: result.data };
}

export function useAllTeams(initialData?: Team[]) {
    const queryClient = useQueryClient();
    const query = useQuery<Team[], string>('teams', getTeams, {
        initialData: initialData,
        onSuccess: (teams) =>
            teams.forEach((team) => {
                queryClient.setQueryData(['team', team.id], team);
            }),
    });
    return { ...query, teams: query.data };
}

export function useTeam(teamId?: number | null, initialData?: Team) {
    const query = useQuery(
        ['team', teamId],
        () => {
            if (!teamId) {
                throw new Error('Cannot fetch undefined team');
            }
            return getTeam(teamId);
        },
        { enabled: !!teamId, initialData }
    );
    return { ...query, team: query.data };
}

export function useTeamMembers(teamId: number) {
    const query = useQuery(['members', teamId], () => getTeamMembers(teamId));
    return { ...query, members: query.data };
}

export function useTeamRequests(teamId: number) {
    const query = useQuery(
        ['teamRequests', teamId],
        () => getRequestsToTeam(teamId),
        { initialData: [] }
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
    const { updateTeam } = useUpdateTeam();
    const mutation = useMutation(
        ({ team, file }: { team: Team; file: File }) =>
            uploadTeamLogo(team, file),
        {
            onSuccess: (publicUrl, { team }) => {
                updateTeam({ ...team, logo: publicUrl });
            },
        }
    );
    return { ...mutation, uploadTeamLogo: mutation.mutateAsync };
}

export function useRemoveTeamLogo() {
    const { updateTeam } = useUpdateTeam();
    const mutation = useMutation(
        ({ team }: { team: Team }) => removeTeamLogo(team),
        {
            onSuccess: (_, { team }) => {
                updateTeam({ ...team, logo: '' });
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
            queryClient.invalidateQueries('currentTeamId');
        },
    });
    return { ...mutation, leaveTeam: mutation.mutateAsync };
}

export function useMentorAssignments() {
    const query = useQuery('mentorAssignments', () => getMentorAssignments());
    return { ...query, mentorAssignments: query.data };
}

export function useAssignMentor() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({
            teamId,
            mentorId,
        }: {
            teamId: Team['id'];
            mentorId: Profile['userId'];
        }) => assignMentor(teamId, mentorId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('mentorAssignments');
            },
        }
    );
    return { ...mutation, assignMentor: mutation.mutateAsync };
}

export function useUnassignMentor() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        ({ teamId }: { teamId: Team['id'] }) => unassignMentor(teamId),
        {
            onSuccess: (deleted) => {
                const newData = queryClient.getQueriesData('mentorAssignments');
                delete newData[deleted.team];
                queryClient.setQueryData('mentorAssignments', newData);
            },
        }
    );
    return { ...mutation, unassignMentor: mutation.mutateAsync };
}
