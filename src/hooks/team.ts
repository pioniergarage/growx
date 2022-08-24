import {
    getRequestsToTeam,
    getTeam,
    getTeamMembers,
    getTeamOfUser,
    getTeamRequestedToJoin,
    getTeams,
} from 'api/teams';
import { Profile, Team } from 'model';
import { useEffect, useState } from 'react';
import useLoadingValue from './useLoadingValue';

export function useTeamOfUser(userId?: string) {
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState<Team>();
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            if (!userId) return;
            setLoading(true);
            const { data, error } = await getTeamOfUser(userId);
            setLoading(false);
            if (error) {
                setError(error?.message || 'Something went wrong');
            } else {
                setError('');
                setTeam(data);
            }
        })();
    }, [userId]);
    return { loading, team, error, setTeam };
}

export function useAllTeams() {
    const {
        loading,
        error,
        value: teams,
    } = useLoadingValue<Team[]>({ supplier: getTeams, defaultValue: [] });
    return { loading, error, teams };
}

export function useTeam(teamId: number) {
    const {
        loading,
        error,
        value: team,
    } = useLoadingValue<Team | undefined>({
        supplier: () => getTeam(teamId),
        defaultValue: undefined,
    });
    return { loading, error, team };
}

export function useTeamMembers(teamId: number) {
    const {
        loading,
        error,
        value: members,
        setValue: setMembers,
    } = useLoadingValue<Profile[]>({
        supplier: () => getTeamMembers(teamId),
        defaultValue: [],
        dependencies: [teamId],
    });
    return { loading, error, members, setMembers };
}

export function useTeamRequests(teamId: number) {
    const {
        loading,
        error,
        value: requests,
        setValue: setRequests,
    } = useLoadingValue<Profile[]>({
        supplier: () => getRequestsToTeam(teamId),
        defaultValue: [],
        dependencies: [teamId],
    });
    return { loading, error, requests, setRequests };
}

export function useCurrentRequest(userId?: string) {
    const [loading, setLoading] = useState(true);
    const [teamRequested, setTeamRequested] = useState<Team>();
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            if (!userId) return;
            setLoading(true);
            const { data, error } = await getTeamRequestedToJoin(userId);
            setLoading(false);
            if (error) {
                setError(error?.message || 'Something went wrong');
                return;
            }
            setError('');
            setTeamRequested(data);
        })();
    }, [userId]);
    return { loading, teamRequested, error, setTeamRequested };
}
