import { useUser } from '@supabase/auth-helpers-react';
import { getProfile, updateProfile } from 'api';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Profile, ProfileDto } from 'types';

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
                const { first_name, last_name, user_roles } = data;
                setProfile({
                    ...data,
                    firstName: first_name,
                    lastName: last_name,
                    role:
                        user_roles.length > 0 ? user_roles[0].role : undefined,
                });
            }
            setLoading(false);
        }
        fetchProfile();
    }, [user]);

    async function update(profile: Profile) {
        setLoading(true);
        const dto: ProfileDto = {
            first_name: profile.firstName,
            last_name: profile.lastName,
            email: profile.email,
            phone: profile.phone,
            gender: profile.gender,
            user_id: profile.user_id,
            studies: profile.studies,
            homeland: profile.homeland,
            university: profile.university
        }
        const { error } = await updateProfile(user?.id || '', dto)
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
