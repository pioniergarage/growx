import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from 'database/DatabaseDefition';
import { useQuery } from 'react-query';
import adminApi from './api';

export const useFullProfiles = () => {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery('fullProfiles', () => {
        return adminApi.getFullProfiles(supabaseClient);
    });
    return { ...result, profiles: result.data };
};

export const useAllProfiles = () => {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery('allProfiles', () => {
        return adminApi.getAllProfiles(supabaseClient);
    });
    return { ...result, profiles: result.data };
};

export const useProfileStats = () => {
    const { profiles } = useAllProfiles();
    return { profiles: profiles ?? [] };
};

export const useTeamsWithDates = () => {

    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery('teamsWithDates', () => {
        return adminApi.getActiveTeamsWithDates(supabaseClient);
    });
    return { ...result, teams: result.data };
}