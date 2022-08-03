import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Profile, ProfileDto } from "types"

const useProfile = () => {
    const { user } = useUser();
    const [profile, setProfile] = useState<Profile | null>(null)
    const [error, setError] = useState<PostgrestError>()

    useEffect(() => {
        async function fetchProfile() {
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
        }
        fetchProfile()
    }, [user])
    return { profile, error }
}
export default useProfile