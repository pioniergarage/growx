import { deleteSponsor, getSponsors, upsertSponsor } from 'database/sponsors';
import { Sponsor } from 'model';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useSponsors() {
    const result = useQuery('sponsors', async () => await getSponsors());
    return { ...result, sponsors: result.data };
}

export function useDeleteSponsor() {
    const { sponsors } = useSponsors();
    const queryClient = useQueryClient();
    const mutation = useMutation((id: number) => deleteSponsor(id), {
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
    const { sponsors } = useSponsors();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (sponsor: Sponsor) => await upsertSponsor(sponsor),
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
