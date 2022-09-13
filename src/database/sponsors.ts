import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Sponsor } from 'model';
import { definitions } from './supabase';
import { handleResponse, handleSingleResponse } from './utils';

export const getSponsors = () =>
    supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .select('*')
        .then((response) => handleResponse(response, 'Could not load sponsors'))
        .then((dtos) => dtos.map((sponsor) => sponsor as Sponsor));

export const upsertSponsor = (sponsor: Sponsor) =>
    supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .upsert(sponsor, { returning: 'representation' })
        .match({ id: sponsor.id })
        .single()
        .then((response) => handleSingleResponse(response));

export const deleteSponsor = async (id: number) =>
    supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .delete({ returning: 'representation' })
        .match({ id })
        .single()
        .then((response) => handleSingleResponse(response));

export const uploadLogo = async (name: string, image: Blob) => {
    await supabaseClient.storage
        .from('sponsors')
        .upload(name, image, { upsert: true })
        .then(({ error, data }) => {
            if (error || !data) {
                throw new Error(error?.message || 'Something went wrong');
            }
        });
    const { publicURL, error } = supabaseClient.storage
        .from('sponsors')
        .getPublicUrl(name);
    if (error || !publicURL) {
        throw new Error(error?.message || 'Something went wrong');
    }
    return publicURL;
};
