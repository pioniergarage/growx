import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from 'database/DatabaseDefition';
import { FullProfile } from 'modules/profile/types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import adminApi from './api';

export const useFullProfiles = () => {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery(
        'fullProfiles',
        () => {
            return adminApi.getFullProfiles(supabaseClient);
        },
        {
            refetchOnWindowFocus: false,
        }
    );
    return { ...result, profiles: result.data };
};

export const useAllProfiles = () => {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery('allProfiles', () => {
        return adminApi.getAllProfiles(supabaseClient);
    });
    return { ...result, profiles: result.data };
};

export const useProfileStats = () => {
    const { profiles } = useAllProfiles();
    return { profiles: profiles ?? [] };
};

export const useTeamsWithDates = () => {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery('teamsWithDates', () => {
        return adminApi.getActiveTeamsWithDates(supabaseClient);
    });
    return { ...result, teams: result.data };
};

export const useUpsertMatriculation = () => {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async ({
            userId,
            matriculation,
        }: {
            userId: string;
            matriculation: string;
        }) => {
            await adminApi.upsertMatriculation(
                supabaseClient,
                userId,
                matriculation
            );
            return { userId, matriculation };
        },
        {
            onSuccess: (updated) => {
                const fullProfiles = queryClient.getQueryData(
                    'fullProfiles'
                ) as FullProfile[] | undefined;
                if (!fullProfiles) {
                    return;
                }
                const pIndex = fullProfiles.findIndex(
                    (p) => p.userId == updated.userId
                );
                if (pIndex < 0) {
                    return;
                }
                fullProfiles[pIndex].matriculation = updated.matriculation;
                queryClient.setQueryData('fullProfiles', fullProfiles);
            },
        }
    );
    return { ...mutation, upsertMatriculation: mutation.mutateAsync };
};
