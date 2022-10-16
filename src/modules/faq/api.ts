import { supabaseClient } from '@supabase/auth-helpers-nextjs';

import { definitions } from '../../database/supabase';
import { handleResponse } from '../../database/utils';
import { FAQ } from './types';

export const getFAQs = () =>
    supabaseClient
        .from<definitions['faqs']>('faqs')
        .select('*')
        .then(handleResponse)
        .then((dtos) => dtos.map((f) => f as FAQ));
