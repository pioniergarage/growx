import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Database } from 'database/DatabaseDefition';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import QUERY_KEYS from 'utils/queryKeys';
import profileApi from './api';
import { FurtherProfileInfo, Profile } from './types';

export function useProfile() {
    const supabaseClient = useSupabaseClient<Database>();
    const user = useUser();
    const result = useQuery(
        QUERY_KEYS.profile(user?.id),
        async () => {
            if (!user?.id) {
                throw new Error('user id not available. Cannot fetch Profile');
            }

            return profileApi.getProfile(supabaseClient, user.id);
        },
        { enabled: !!user }
    );
    return { ...result, profile: result.data };
}

export function useProfiles() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const query = useQuery(
        QUERY_KEYS.profiles(),
        async () => profileApi.getProfiles(supabaseClient),
        {
            onSuccess: (profiles: Profile[]) => {
                profiles.forEach((profile) =>
                    queryClient.setQueryData(
                        QUERY_KEYS.profile(profile.user_id),
                        profile
                    )
                );
            },
        }
    );
    return { ...query, profiles: query.data };
}

export function useUpsertProfile() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (profile: Profile) => profileApi.upsertProfile(supabaseClient, profile),
        {
            onSuccess: (updated: Profile) => {
                queryClient.setQueryData<Profile | undefined>(
                    QUERY_KEYS.profile(updated.user_id),
                    updated
                );
                const oldProfiles =
                    queryClient.getQueryData<Profile[]>(
                        QUERY_KEYS.profiles()
                    ) ?? [];
                const index = oldProfiles.findIndex(
                    (p) => p.user_id === updated.user_id
                );

                oldProfiles.splice(index, 1, updated);
                queryClient.setQueryData(QUERY_KEYS.profiles(), oldProfiles);
            },
        }
    );
    return { ...mutation, upsertProfile: mutation.mutateAsync };
}

export function useContactInformation(userId?: string) {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery(
        QUERY_KEYS.contactInformation(userId),
        () => {
            if (!userId) {
                throw new Error('user id not available. Cannot fetch Profile');
            }
            return profileApi.getContactInformation(supabaseClient, userId);
        },
        { enabled: !!userId }
    );
    return { ...result, contactInformation: result.data };
}

export function useInsertFurhterProfileInfo() {
    const supabaseClient = useSupabaseClient<Database>();
    const mutation = useMutation(async (data: FurtherProfileInfo) =>
        profileApi.insertSignupInfo(supabaseClient, data)
    );
    return { ...mutation, insertFurtherProfileInfo: mutation.mutateAsync };
}

export function useIsAdmin() {
    const supabaseClient = useSupabaseClient<Database>();
    const user = useUser();
    const result = useQuery(
        QUERY_KEYS.admin(user?.id),
        async () => {
            if (!user?.id) {
                throw new Error('user id not available. Cannot fetch Profile');
            }

            return profileApi.isAdmin(supabaseClient, user.id);
        },
        { enabled: !!user }
    );
    return { ...result, isAdmin: result.data };
}
