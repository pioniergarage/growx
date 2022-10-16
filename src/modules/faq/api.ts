import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { FAQ } from 'model';
import { definitions } from '../../database/supabase';
import { handleResponse } from '../../database/utils';

export const getFAQs = () =>
    supabaseClient
        .from<definitions['faqs']>('faqs')
        .select('*')
        .then(handleResponse)
        .then((dtos) => dtos.map((f) => f as FAQ));
