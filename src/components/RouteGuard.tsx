import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';

export default function RouteGuard({ children }: PropsWithChildren) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace('/connect/login');
        }
    }, [user]);
    if (!user) return <></>

    return <>{children}</>;
}
