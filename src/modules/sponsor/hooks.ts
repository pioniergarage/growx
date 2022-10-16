
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { deleteSponsor, getSponsors, upsertSponsor } from 'modules/sponsor/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Sponsor } from './types';

export function useSponsors() {
    const supabaseClient = useSupabaseClient()
    const result = useQuery('sponsors', async () => await getSponsors(supabaseClient));
    return { ...result, sponsors: result.data };
}

export function useDeleteSponsor() {
    const supabaseClient = useSupabaseClient()
    const { sponsors } = useSponsors();
    const queryClient = useQueryClient();
    const mutation = useMutation((id: number) => deleteSponsor(supabaseClient, id), {
        onSuccess: (deleted) => {
            queryClient.setQueryData(
                'sponsors',
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
        async (sponsor: Sponsor) => await upsertSponsor(supabaseClient, sponsor),
        {
            onSuccess: (upserted) => {
                queryClient.setQueryData(
                    'sponsors',
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
