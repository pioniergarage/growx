import { useSupabaseClient } from '@/components/providers/SupabaseProvider';
import { useQuery } from 'react-query';
import adminApi from './api';

export const useFullProfiles = () => {
    const supabaseClient = useSupabaseClient();
    const result = useQuery(
        'fullProfiles',
        () => {
            return adminApi.getFullProfiles(supabaseClient);
        },
        {
            refetchOnWindowFocus: false,
        }
    );
    return { ...result, profiles: result.data };
};

export const useAllProfiles = () => {
    const supabaseClient = useSupabaseClient();
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
    const supabaseClient = useSupabaseClient();
    const result = useQuery('teamsWithDates', () => {
        return adminApi.getActiveTeamsWithDates(supabaseClient);
    });
    return { ...result, teams: result.data };
};
