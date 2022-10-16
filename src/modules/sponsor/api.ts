import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';

import { handleResponse, handleSingleResponse } from '../../database/utils';
import { Sponsor } from './types';

export const getSponsors = async (supabaseClient: SupabaseClient<Database>) =>
    await supabaseClient
        .from('sponsors')
        .select('*')
        .then(handleResponse)

export const upsertSponsor = async (supabaseClient: SupabaseClient<Database>, sponsor: Sponsor) =>
    await supabaseClient
        .from('sponsors')
        .upsert(sponsor)
        .match({ id: sponsor.id })
        .select()
        .single()
        .then(handleSingleResponse);

export const deleteSponsor = async (supabaseClient: SupabaseClient<Database>, id: number) =>
    await supabaseClient
        .from('sponsors')
        .delete()
        .match({ id })
        .select()
        .single()
        .then(handleSingleResponse);

export const uploadLogo = async (supabaseClient: SupabaseClient<Database>, name: string, image: Blob) => {
    await supabaseClient.storage
        .from('sponsors')
        .upload(name, image, { upsert: true })
        .then(({ error, data }) => {
            if (error || !data) {
                throw new Error(error?.message || 'Something went wrong');
            }
        });
    const { data: { publicUrl } } = supabaseClient.storage
        .from('sponsors')
        .getPublicUrl(name);
    if (!publicUrl) {
        throw new Error('Something went wrong');
    }
    return publicUrl;
};
