import { useUser } from '@supabase/auth-helpers-react';
import { getProfile, updateProfile } from 'api';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Profile } from 'model';

const ProfileContext = createContext<{
    profile?: Profile;
    loading: boolean;
    error?: string;
    update: (profile: Profile) => Promise<void>;
}>({ loading: false, update: () => Promise.reject() });

export function ProfileProvider({ children }: PropsWithChildren) {
    const { user } = useUser();
    const [profile, setProfile] = useState<Profile | undefined>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            if (!user) return;
            const { data, error } = await getProfile(user.id)
            if (error) {
                setError(error.message);
            } else {
                setProfile(data);
            }
            setLoading(false);
        }
        fetchProfile();
    }, [user]);

    async function update(profile: Profile) {
        setLoading(true);
        const { error } = await updateProfile(user?.id || '', profile)
        if (!error) {
            setProfile(profile);
        }
        setLoading(false);
        if (error) {
            throw error.message;
        }
    }

    return (
        <ProfileContext.Provider value={{ profile, loading, error, update }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw Error('useProfile must be wrapped inside a ProfileProvider');
    }
    return context;
}
