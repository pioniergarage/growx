import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Sponsor } from 'model';
import { definitions } from './supabase';
import { SupabaseResponse, mapResponse } from './utils';

export async function getSponsors(): Promise<SupabaseResponse<Sponsor[]>> {
    const response = await supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .select('*');
    return mapResponse(response, (s) => s);
}

export const upsertSponsor = async (sponsor: Sponsor) =>
    await supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .upsert(sponsor)
        .match({ id: sponsor.id })
        .single();

export const deleteSponsor = async (id: number) =>
    await supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .delete()
        .match({ id });
