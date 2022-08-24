
import { getTeam, getTeamMembers, getTeamOfUser, getTeams } from "api/teams";
import { Profile, Team } from "model";
import { useEffect, useState } from "react";
import useLoadingValue from "./useLoadingValue";

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
    return { loading, team, error, setTeam }
}

export function useAllTeams() {
    const { loading, error, value: teams } = useLoadingValue<Team[]>({ supplier: getTeams, defaultValue: [] })
    return { loading, error, teams }
}

export function useTeam(teamId: number) {
    const { loading, error, value: team } = useLoadingValue<Team | undefined>({ supplier: () => getTeam(teamId), defaultValue: undefined })
    return { loading, error, team }
}

export function useTeamMembers(teamId: number) {
    const { loading, error, value: members } = useLoadingValue<Profile[]>({ supplier: () => getTeamMembers(teamId), defaultValue: [] })
    return { loading, error, members }
}