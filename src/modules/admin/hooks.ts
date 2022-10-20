import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "database/DatabaseDefition";
import { useQuery } from "react-query";
import adminApi from "./api";

export const useFullProfiles = () => {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery(
        'fullProfiles',
        () => {
            return adminApi.getFullProfiles(supabaseClient);
        }
    );
    return { ...result, profiles: result.data };
}