
import { getTeamOfUser, getTeams, getTeamWithMembers } from "api";
import { ProfileWithoutRole, Team } from "model";
import { useEffect, useState } from "react";

export function useTeamOfUser(userId?: string) {
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState<Team>();
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            if (!userId) return
            setLoading(true)
            const { data, error } = await getTeamOfUser(userId)
            setLoading(false)
            if (error) {
                setError(error?.message || 'Something went wrong')
                return
            }
            setError('')
            setTeam(data)
        })()
    }, [userId])
    return { loading, team, error }
}

export function useAllTeams() {
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState('')
    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, error } = await getTeams();
            setLoading(false);
            if (error || !data) {
                setError(error?.message || 'Something went wrong')
                return
            }
            setTeams(data);
        })();
    }, []);
    return { loading, teams, error }
}

export function useTeam(teamId: number) {
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState<Team & {
        members: ProfileWithoutRole[];
    }>();
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            setLoading(true)
            const { data, error } = await getTeamWithMembers(teamId)
            setLoading(false)
            if (error || !data) {
                setError(error?.message || 'Something went wrong')
                return
            }
            setError('')
            setTeam(data)
        })()
    }, [teamId])
    return { loading, team, error }
}