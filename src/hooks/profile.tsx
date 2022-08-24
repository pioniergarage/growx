import { useUser } from '@supabase/auth-helpers-react';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Profile } from 'model';
import { getProfile, updateProfile } from 'api/profile';

const ProfileContext = createContext<{
    profile?: Profile;
    loading: boolean;
    error?: string;
    update: (profile: Profile) => Promise<void>;
    setProfile: (profile: Profile) => void;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ loading: false, update: () => Promise.reject(), setProfile: () => {} });

export function ProfileProvider({ children }: PropsWithChildren) {
    const { user } = useUser();
    const userId = user?.id;
    const [profile, setProfile] = useState<Profile | undefined>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (!userId) return;
            const { data, error } = await getProfile(userId);
            if (error) {
                setError(error.message);
            } else {
                setProfile(data);
            }
            setLoading(false);
        })();
    }, [userId]);

    async function update(profile: Profile) {
        setLoading(true);
        const { error } = await updateProfile(user?.id || '', profile);
        if (!error) {
            setProfile(profile);
        }
        setLoading(false);
        if (error) {
            throw error.message;
        }
    }

    return (
        <ProfileContext.Provider
            value={{ profile, loading, error, update, setProfile }}
        >
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
