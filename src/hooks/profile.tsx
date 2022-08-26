import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchUserAvatar, uploadUserAvatar } from 'api/avatar';
import { fetchProfile, getProfiles, updateProfile } from 'api/profile';
import { Profile } from 'model';

export function useProfile() {
    const { user } = useUser();
    const userId = user?.id;
    const result = useQuery(
        'profile',
        () => {
            if (!userId) {
                throw new Error('user id not available. Cannot fetch Profile');
            }
            return fetchProfile(userId);
        },
        { enabled: !!userId }
    );
    return { ...result, profile: result.data };
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (profile: Partial<Profile> & Pick<Profile, 'userId'>) =>
            updateProfile(profile),
        {
            onSuccess: (updated) => {
                queryClient.setQueryData<Profile | undefined>(
                    'profile',
                    updated
                );
            },
        }
    );
    return { ...mutation, updateProfile: mutation.mutateAsync };
}

export function useAvatarUrl(profile?: Profile) {
    const result = useQuery(
        ['avatar', profile?.userId],
        async () => {
            if (!profile) {
                throw new Error('Cannot fetch profile avatar');
            }
            if (!profile.avatar) {
                return null;
            }
            const blob = await fetchUserAvatar(profile.avatar);
            return URL.createObjectURL(blob);
        },
        { enabled: !!profile }
    );
    return { ...result, avatarUrl: result.data };
}

export function useUploadAvatar() {
    const queryClient = useQueryClient();
    const { updateProfile } = useUpdateProfile();
    const mutation = useMutation(
        ({ profile, file }: { profile: Profile; file: File }) =>
            uploadUserAvatar(profile, file),
        {
            onSuccess: async (filename, { profile, file }) => {
                updateProfile({ ...profile, avatar: filename });
                queryClient.setQueryData(
                    ['avatar', profile.userId],
                    URL.createObjectURL(file)
                );
            },
        }
    );
    return { ...mutation, uploadUserAvatar: mutation.mutateAsync };
}

export function useProfiles() {
    const query = useQuery('profiles', getProfiles);
    return { ...query, profiles: query.data };
}
