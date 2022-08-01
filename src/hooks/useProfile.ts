import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { PostgrestError, User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Profile, ProfileDto } from "types"

const useProfile = () => {
    const {user} = useUser();
    const [profile, setProfile] = useState<Profile>(null)
    const [error, setError] = useState<PostgrestError>()

    async function fetchProfile() {
        console.log("fetching profile", user)
        if (!user) return
        const { data, error } = await supabaseClient.from<ProfileDto>('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single()
        if (error) {
            setError(error)
            console.error(error)
        } else {
            console.log(data)
            const { first_name, last_name } = data
            setProfile({ ...data, firstName: first_name, lastName: last_name })
        }
    }

    useEffect(() => { fetchProfile() }, [user])
    return { profile, error }
}
export default useProfile