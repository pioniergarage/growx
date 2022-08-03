import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Profile, ProfileDto } from "types"

const useProfile = () => {
    const { user } = useUser();
    const [profile, setProfile] = useState<Profile | null>(null)
    const [error, setError] = useState<PostgrestError>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true)
            if (!user) return
            const { data, error } = await supabaseClient.from<ProfileDto>('profiles')
                .select('*')
                .eq('user_id', user.id)
                .single()
            if (error) {
                setError(error)
            } else {
                const { first_name, last_name } = data
                setProfile({ ...data, firstName: first_name, lastName: last_name })
            }
            setLoading(false)
        }
        fetchProfile()
    }, [user])

    async function update(profile: Profile) {
        setLoading(true)
        const { firstName, lastName, ...rest } = profile
        const { error } = await supabaseClient.from<ProfileDto>('profiles')
            .update({ ...rest, first_name: firstName, last_name: lastName }, { returning: 'minimal' })
            .eq('user_id', user?.id || '')
        if (!error) {
            setProfile(profile)
        }
        setLoading(false)
        return { error }
    }

    return { profile, error, loading, update }
}
export default useProfile