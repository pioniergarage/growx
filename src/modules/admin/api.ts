import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "database/DatabaseDefition";
import { handleResponse } from "database/utils";
import { ContactInformation } from "modules/contactInformation/types";
import { mapProfileDto } from "modules/profile/api";
import { Profile } from "modules/profile/types";

interface AdminApi {
    getFullProfiles(supabase: SupabaseClient<Database>): Promise<(Profile & ContactInformation)[]>
}

const adminApi: AdminApi = {
    getFullProfiles: async (supabase) => {
        const profiles = await supabase
            .from('profiles')
            .select('*, contact_information(*)')
            .then(handleResponse)
            .then(dtos => dtos.map(({ contact_information, ...rest }) => ({ profile: rest, contact_informations: contact_information as ContactInformation[] })))
            .then(dtos => dtos.map(dto => ({ ...mapProfileDto(dto.profile), ...(dto.contact_informations.pop() as ContactInformation) })))
        return profiles
    }
}

export default adminApi;