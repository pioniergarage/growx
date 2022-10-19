import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';
import { handleEmptyResponse, handleMaybeSingleResponse, handleResponse, handleSingleResponse } from '../../database/utils';
import { ContactInformation, FurtherProfileInfo, Profile } from './types';

interface ProfileApi {
    getProfile: (supabaseClient: SupabaseClient<Database>, user_id: string) => Promise<Profile>
    getProfiles: (supabaseClient: SupabaseClient<Database>) => Promise<Profile[]>
    getProfilesOfType: (supabaseClient: SupabaseClient<Database>, type: Profile["type"]) => Promise<Profile[]>
    upsertProfile: (supabaseClient: SupabaseClient<Database>, profile: Profile) => Promise<Profile>

    getContactInformation: (supabaseClient: SupabaseClient<Database>, user_id: string) => Promise<ContactInformation>
    upsertContactInformation: (SupabaseClient: SupabaseClient<Database>, user_id: string, info: ContactInformation) => Promise<ContactInformation>

    insertSignupInfo: (supabaseClient: SupabaseClient<Database>, info: FurtherProfileInfo) => void

    isAdmin: (SupabaseClient: SupabaseClient<Database>, user_id: string) => Promise<boolean>
}

const profileApi: ProfileApi = {
    async getProfile(supabaseClient, user_id) {
        const profile = await supabaseClient
            .from('profile')
            .select('*')
            .eq('user_id', user_id)
            .single()
            .then(handleSingleResponse);
        return profile
    },
    async getProfiles(supabaseClient) {
        const profiles = await supabaseClient
            .from('profile')
            .select('*')
            .then(handleResponse)
        return profiles;
    },
    async getProfilesOfType(supabaseClient, type) {
        const profiles = supabaseClient
            .from('profile')
            .select('*')
            .eq("type", type)
            .select()
            .then(handleResponse)
        return profiles
    },
    async upsertProfile(supabaseClient, profile) {
        const updated =
            await supabaseClient
                .from('profile')
                .upsert(profile)
                .select()
                .single()
                .then(handleSingleResponse)
        return updated;
    },

    async getContactInformation(supabaseClient, user_id) {
        const info = await supabaseClient
            .from("contact_information")
            .select("*")
            .match({ user_id })
            .single()
            .then(handleSingleResponse);
        return info;
    },
    async upsertContactInformation(SupabaseClient, user_id, info) {
        const updated = await SupabaseClient
            .from("contact_information")
            .upsert({ ...info, user_id })
            .select()
            .single()
            .then(handleSingleResponse);
        return updated;
    },
    async insertSignupInfo(supabaseClient, info) {
        supabaseClient
            .from('signup_info')
            .insert(info)
            .then(handleEmptyResponse)
    },

    async isAdmin(supabaseClient, user_id) {
        return await supabaseClient
            .from("admin")
            .select('user_id')
            .eq('user_id', user_id)
            .maybeSingle()
            .then(handleMaybeSingleResponse)
            .then((result) => !!result)
    }
}

export default profileApi;

