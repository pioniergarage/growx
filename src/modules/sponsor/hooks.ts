import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import QUERY_KEYS from 'utils/queryKeys';
import sponsorApi from './api';
import { Sponsor } from './types';

export function useSponsors() {
    const supabaseClient = useSupabaseClient()
    const result = useQuery(QUERY_KEYS.sponsors(), async () => await sponsorApi.getSponsors(supabaseClient));
    return { ...result, sponsors: result.data };
}

export function useDeleteSponsor() {
    const supabaseClient = useSupabaseClient()
    const { sponsors } = useSponsors();
    const queryClient = useQueryClient();
    const mutation = useMutation((id: number) => sponsorApi.deleteSponsor(supabaseClient, id), {
        onSuccess: (deleted) => {
            queryClient.setQueryData(
                QUERY_KEYS.sponsors(),
                sponsors?.filter((s) => s.id !== deleted.id)
            );
        },
    });
    return { ...mutation, deleteSponsor: mutation.mutateAsync };
}

export function useUpsertSponsor() {
    const supabaseClient = useSupabaseClient()
    const { sponsors } = useSponsors();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (sponsor: Sponsor) => await sponsorApi.upsertSponsor(supabaseClient, sponsor),
        {
            onSuccess: (upserted) => {
                queryClient.setQueryData(
                    QUERY_KEYS.sponsors(),
                    sponsors
                        ? [
                            ...sponsors.filter((s) => s.id != upserted.id),
                            upserted,
                        ]
                        : [upserted]
                );
            },
        }
    );
    return { ...mutation, upsertSponsor: mutation.mutateAsync };
}
