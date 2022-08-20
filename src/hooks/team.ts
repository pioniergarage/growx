
import { getTeamWithMembers } from "api";
import { ProfileWithoutRole, Team } from "model";
import { useEffect, useState } from "react";

export default function useTeam(teamId: number) {
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