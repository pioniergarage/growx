import GrowConnectLayout from "@/components/layouts/GrowConnectLayout"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"
import { Profile } from "types/growconnect"

function Profile() {
    const { user } = useUser()
    const [profile, setProfile] = useState<Profile>()

    useEffect(() => {
        async function fetchData(userId: string) {
            const { data, error } = await supabaseClient
                .from<Profile>('profiles')
                .select('*')
                .eq('user_id', userId)
                .single()
            if (!error) setProfile(data)
        }
        if (user) fetchData(user.id)
    }, [user])

    return (
        <div>
            <div>{JSON.stringify(user) || 'No user'}</div>
            <div>{JSON.stringify(profile)}</div>
        </div>
    )
}

Profile.getLayout = (page: ReactNode) => (
    <GrowConnectLayout>
        {page}
    </GrowConnectLayout>
)

export default Profile
