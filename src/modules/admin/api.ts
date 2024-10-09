import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import { handleResponse } from 'database/utils';
import { ContactInformation } from 'modules/contactInformation/types';
import { mapProfileDto } from 'modules/profile/api';
import { FullProfile, Profile } from 'modules/profile/types';
import { mapTeamDto } from 'modules/teams/api';
import { Team } from 'modules/teams/types';

interface AdminApi {
    getFullProfiles(supabase: SupabaseClient<Database>): Promise<FullProfile[]>;
    getAllProfiles(
        supabase: SupabaseClient<Database>
    ): Promise<(Profile & { insertedAt: Date })[]>;
    getActiveTeamsWithDates(
        supabase: SupabaseClient<Database>
    ): Promise<(Team & { insertedAt: Date })[]>;
    upsertMatriculation(
        supabase: SupabaseClient<Database>,
        userId: string,
        matriculation: string
    ): Promise<void>;
}

const adminApi: AdminApi = {
    getFullProfiles: async (supabase) => {
        const profiles = await supabase
            .from('profiles')
            .select('*, contact_information(*), matriculation(*)')
            .then(handleResponse)
            .then((dtos) =>
                dtos.map(({ contact_information, matriculation, ...rest }) => ({
                    profile: rest,
                    contact_information:
                        contact_information as ContactInformation,
                    matriculation:
                        matriculation as Database['public']['Tables']['matriculation']['Row'],
                }))
            )
            .then((dtos) => {
                return dtos.map((dto) => ({
                    ...mapProfileDto(dto.profile),
                    ...(dto.contact_information as ContactInformation),
                    matriculation: dto.matriculation?.Id,
                }));
            });
        return profiles;
    },
    getAllProfiles: async (supabase) => {
        const profiles = await supabase
            .from('profiles')
            .select('*')
            .then(handleResponse)
            .then((dtos) =>
                dtos.map((dto) => ({
                    ...mapProfileDto(dto),
                    insertedAt: new Date(dto.inserted_at),
                }))
            );
        return profiles;
    },

    getActiveTeamsWithDates: async (supabase) => {
        return await supabase
            .from('teams')
            .select('*')
            .eq('archived', false)
            .then(handleResponse)
            .then((dtos) =>
                dtos.map((dto) => ({
                    ...mapTeamDto(dto),
                    insertedAt: new Date(dto.inserted_at),
                }))
            );
    },

    upsertMatriculation: async (supabase, userId, matriculation) => {
        await supabase.from('matriculation').upsert({
            Id: matriculation,
            user_id: userId,
        });
    },
};

export default adminApi;
