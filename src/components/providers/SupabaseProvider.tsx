// components/providers/SupabaseProvider.tsx
'use client'


import type { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from 'utils/supabase/client';

type SupabaseContext = {
    supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [supabase] = useState(() => createClient())

    return <Context.Provider value={{ supabase }}>{children}</Context.Provider>
}

// Hook for accessing the Supabase client
export const useSupabaseClient = () => {
    const context = useContext(Context)

    if (context === undefined) {
        throw new Error('useSupabaseClient must be used within a SupabaseProvider')
    }

    return context.supabase
}

// -----------------------------------------------------------------
// NEW: Hook for accessing the current user
// -----------------------------------------------------------------
export const useUser = () => {
    const supabase = useSupabaseClient() // Depends on the hook above
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            setUser(user)
        }

        fetchUser()

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [supabase])

    return user
}