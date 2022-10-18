import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';

import { handleResponse, handleSingleResponse } from '../../database/utils';
import { Sponsor } from './types';

interface SponsorApi {
    getSponsors: (supabaseClient: SupabaseClient<Database>) => Promise<Sponsor[]>
    upsertSponsor: (supabaseClient: SupabaseClient<Database>, sponsor: Sponsor) => Promise<Sponsor>
    deleteSponsor: (supabaseClient: SupabaseClient<Database>, id: number) => Promise<Sponsor>
    uploadLogo: (supabaseClient: SupabaseClient<Database>, name: string, image: Blob) => Promise<string>
}

const sponsorApi: SponsorApi = {
    async getSponsors(supabaseClient: SupabaseClient<Database>) {
        return await supabaseClient
            .from('sponsors')
            .select('*')
            .then(handleResponse)
    },
    async upsertSponsor(supabaseClient: SupabaseClient<Database>, sponsor: Sponsor) {
        return await supabaseClient
            .from('sponsors')
            .upsert(sponsor)
            .eq("id", sponsor.id)
            .select()
            .single()
            .then(handleSingleResponse);
    },
    async deleteSponsor(supabaseClient: SupabaseClient<Database>, id: number) {
        return await supabaseClient
            .from('sponsors')
            .delete()
            .eq("id", id)
            .select()
            .single()
            .then(handleSingleResponse)
    },
    async uploadLogo(supabaseClient: SupabaseClient<Database>, name: string, image: Blob) {
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
    }
}

export default sponsorApi;