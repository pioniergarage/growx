import { useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchUserAvatar, uploadUserAvatar } from 'database/avatar';
import {
    fetchProfile,
    getProfiles,
    insertSignupInfo,
    updateProfile,
} from 'database/profile';
import { FurtherProfileInfo, Profile } from 'model';

export function useProfile(userId?: string) {
    const { user } = useUser();
    const userId2 = userId || user?.id;
    const result = useQuery(
        ['profile', userId2],
        () => {
            if (!userId2) {
                throw new Error('user id not available. Cannot fetch Profile');
            }
            return fetchProfile(userId2);
        },
        { enabled: !!userId2 }
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
                    ['profile', updated.userId],
                    updated
                );
                const oldProfiles =
                    queryClient.getQueryData<Profile[]>('profiles') || [];
                const index = oldProfiles.findIndex(
                    (p) => p.userId === updated.userId
                );

                oldProfiles.splice(index, 1, updated);
                queryClient.setQueryData('profiles', oldProfiles);
            },
        }
    );
    return { ...mutation, updateProfile: mutation.mutateAsync };
}

export function useAvatarUrl({
    userId,
    avatar,
}: {
    userId?: Profile['userId'];
    avatar: Profile['avatar'];
}) {
    const result = useQuery(
        ['avatar', userId],
        async () => {
            if (!avatar) {
                return null;
            }
            const blob = await fetchUserAvatar(avatar);
            return URL.createObjectURL(blob);
        },
        { enabled: !!userId }
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
    const queryClient = useQueryClient();
    const query = useQuery('profiles', getProfiles, {
        onSuccess: (profiles) => {
            profiles.forEach((profile) =>
                queryClient.setQueryData(['profile', profile.userId], profile)
            );
        },
    });
    return { ...query, profiles: query.data };
}

export function useInsertFurhterProfileInfo() {
    const mutation = useMutation(
        (data: FurtherProfileInfo & { email: string }) => insertSignupInfo(data)
    );
    return { ...mutation, insertFurtherProfileInfo: mutation.mutateAsync };
}
