import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Database } from 'database/DatabaseDefition';
import {
    fetchMatriculation,
    fetchProfile,
    getProfiles,
    insertSignupInfo,
    updateProfile,
    upsertMatriculation,
} from 'modules/profile/api';
import { FurtherProfileInfo, Profile } from './types';

export function useProfile(userId?: string) {
    const supabaseClient = useSupabaseClient<Database>();
    const user = useUser();
    const userId2 = userId || user?.id;
    const result = useQuery(
        ['profile', userId2],
        () => {
            if (!userId2) {
                throw new Error('user id not available. Cannot fetch Profile');
            }
            return fetchProfile(supabaseClient, userId2);
        },
        { enabled: !!userId2 }
    );
    return { ...result, profile: result.data };
}

export function useUpdateProfile() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (profile: Partial<Profile> & Pick<Profile, 'userId'>) =>
            updateProfile(supabaseClient, profile),
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

export function useMatriculation() {
    const supabaseClient = useSupabaseClient<Database>();
    const user = useUser();
    const query = useQuery(
        'matriculation',
        () => {
            if (!user) {
                throw new Error('User not available');
            }
            return fetchMatriculation(supabaseClient, user.id);
        },
        { enabled: !!user }
    );
    return { ...query, matriculation: query.data };
}

export function useUpsertMatriculation() {
    const supabaseClient = useSupabaseClient<Database>();
    const user = useUser();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (matriculation: string) => {
            if (!user) {
                throw new Error('User not available');
            }
            await upsertMatriculation(supabaseClient, user.id, matriculation);
            return matriculation;
        },
        {
            onSuccess(matriculation) {
                queryClient.setQueryData('matriculation', matriculation);
            },
        }
    );
    return { ...mutation, upsertMatriculation: mutation.mutateAsync };
}

export function useProfiles() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const query = useQuery(
        'profiles',
        async () => getProfiles(supabaseClient),
        {
            onSuccess: (profiles) => {
                profiles.forEach((profile) =>
                    queryClient.setQueryData(
                        ['profile', profile.userId],
                        profile
                    )
                );
            },
        }
    );
    return { ...query, profiles: query.data };
}

export function useInsertFurhterProfileInfo() {
    const supabaseClient = useSupabaseClient<Database>();
    const mutation = useMutation(
        (data: FurtherProfileInfo & { email: string }) =>
            insertSignupInfo(supabaseClient, data)
    );
    return { ...mutation, insertFurtherProfileInfo: mutation.mutateAsync };
}
