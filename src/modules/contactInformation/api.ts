import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "database/DatabaseDefition";
import { handleResponse, handleSingleResponse } from "database/utils";
import { ContactInformation } from "./types";

interface ContactInformationApi {
    getContactInformation(supabase: SupabaseClient<Database>, user_id: string): Promise<ContactInformation>
    getContactInformations(supabase: SupabaseClient<Database>, user_id: string[]): Promise<(ContactInformation & { user_id: string })[]>
    updateContactInformation(supabase: SupabaseClient<Database>, user_id: string, data: ContactInformation): Promise<ContactInformation>
    insertContactInformation(supabase: SupabaseClient<Database>, user_id: string, data: ContactInformation): Promise<ContactInformation>
}

const contactInformationApi: ContactInformationApi = {
    getContactInformation: async (supabase, user_id) => {
        const info = await supabase.from("contact_information")
            .select('*')
            .eq('user_id', user_id)
            .single()
            .then(handleSingleResponse)
        return info
    },
    getContactInformations: async (supabase, user_id) => {
        const info = await supabase.from("contact_information")
            .select('*')
            .in('user_id', user_id)
            .then(handleResponse)
        return info
    },
    updateContactInformation: async (supabase, user_id, data) => {
        const info = await supabase.from("contact_information")
            .update(data)
            .eq('user_id', user_id)
            .select()
            .single()
            .then(handleSingleResponse)
        return info
    },
    insertContactInformation: async (supabase, user_id, data) => {
        const info = await supabase.from("contact_information")
            .insert({ ...data, user_id })
            .select()
            .single()
            .then(handleSingleResponse)
        return info
    }
}

export default contactInformationApi