import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Profile } from "model";
import { definitions } from "./supabase";
import { mapSingleResponse, mapResponse, SupabaseResponse } from "./utils";


export const mapProfileDto: (dto: definitions["profiles"]) => Profile = (dto) => ({
    userId: dto.user_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    phone: dto.phone,
    homeland: dto.homeland,
    email: dto.email,
    studies: dto.studies,
    university: dto.university,
    gender: dto.gender,
    role: dto.role,
    avatar: dto.avatar
})

export async function getProfile(user_id: string): Promise<SupabaseResponse<Profile>> {
    const response = await supabaseClient
        .from<definitions["profiles"]>('profiles')
        .select('*')
        .eq('user_id', user_id)
        .single();
    return mapSingleResponse(response, mapProfileDto)
}

export const updateProfile = async (userId: string, profile: Partial<Profile>) => await supabaseClient
    .from<definitions["profiles"]>('profiles')
    .update({
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        studies: profile.studies,
        university: profile.university,
        homeland: profile.homeland,
        gender: profile.gender,
        avatar: profile.avatar,
    }, { returning: 'representation' })
    .match({ user_id: userId })

export const getProfiles = async (): Promise<SupabaseResponse<Profile[]>> => {
    const response = await supabaseClient
        .from<definitions["profiles"]>('profiles')
        .select('*');
    return mapResponse(response, mapProfileDto)
}
