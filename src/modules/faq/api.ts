import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';

import { handleResponse } from '../../database/utils';
import { FAQ } from './types';

export const getFAQs = (supabaseClient: SupabaseClient<Database>) =>
    supabaseClient
        .from('faqs')
        .select('*')
        .then(handleResponse)
        .then((dtos) => dtos.map((f) => f as FAQ));
