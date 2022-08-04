import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

const useRole = () => {
    const { user } = useUser();
    const [role, setRole] = useState<string>('')
    const [error, setError] = useState<PostgrestError>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchRole() {
            setLoading(true)
            if (!user) return
            const { data, error } = await supabaseClient.from<{role: string, id: string}>('user_roles')
                .select('role')
                .eq('id', user.id)
                .limit(1)
            if (error) {
                console.error(error)
                setError(error)
            } else if (data.length > 0) {
                setRole(data[0].role)
            }
            setLoading(false)
        }
        fetchRole()
    }, [user])

    return { role, error, loading }
}
export default useRole