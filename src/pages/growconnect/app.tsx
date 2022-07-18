import GrowConnectLayout from "@/components/layouts/GrowConnectLayout"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"

function App() {
    const { user, error } = useUser()
    const [data, setData] = useState()

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabaseClient.from('restricted').select('*')
            if (!error) setData(data)
        }
        if (user) fetchData()
    }, [user])

    return (
        <div>
            <div>{JSON.stringify(user) || 'No user'}</div>
            <div>{JSON.stringify(data)}</div>
        </div>
    )
}

App.getLayout = (page: ReactNode) => (
    <GrowConnectLayout>
        {page}
    </GrowConnectLayout>
)

export default App
