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
