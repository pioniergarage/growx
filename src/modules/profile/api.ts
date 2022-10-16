import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';

import { handleResponse, handleSingleResponse } from '../../database/utils';
import { FurtherProfileInfo, Profile } from './types';

export const mapProfileDto: (dto: Database['public']['Tables']['profiles']['Row']) => Profile = (
    dto
) => ({
    userId: dto.user_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    phone: dto.phone || undefined,
    homeland: dto.homeland || undefined,
    email: dto.email,
    studies: dto.studies || undefined,
    university: dto.university || undefined,
    universityCountry: dto.universityCountry || undefined,
    gender: dto.gender || undefined,
    role: dto.role,
    avatar: dto.avatar || undefined,
    skills: dto.skills as string[],
    bio: dto.bio || '',
    keyQualification: dto.keyQualification,
});

export async function fetchProfile(supabaseClient: SupabaseClient<Database>, user_id: string): Promise<Profile> {
    return supabaseClient
        .from('profiles')
        .select('*')
        .eq('user_id', user_id)
        .single()
        .then(handleSingleResponse)
        .then(mapProfileDto);
}

export const updateProfile = async (supabaseClient: SupabaseClient<Database>,
    profile: Partial<Profile> & Pick<Profile, 'userId'>
) =>
    supabaseClient
        .from('profiles')
        .update(
            {
                first_name: profile.firstName,
                last_name: profile.lastName,
                email: profile.email,
                phone: profile.phone,
                studies: profile.studies,
                university: profile.university,
                universityCountry: profile.universityCountry,
                homeland: profile.homeland,
                gender: profile.gender,
                avatar: profile.avatar,
                skills: profile.skills,
                role: profile.role,
                bio: profile.bio,
                keyQualification: profile.keyQualification,
            }
        )
        .match({ user_id: profile.userId })
        .select()
        .single()
        .then(handleSingleResponse)
        .then(mapProfileDto);

export const getProfiles = async (supabaseClient: SupabaseClient<Database>): Promise<Profile[]> => {
    return supabaseClient
        .from('profiles')
        .select('*')
        .then(handleResponse)
        .then((dtos) => dtos.map(mapProfileDto));
};

export const getPublicMentors = async (supabaseClient: SupabaseClient<Database>) => {
    return supabaseClient
        .from('profiles')
        .select('user_id, first_name, last_name, avatar, bio')
        .match({ role: 'MENTOR' })
        .select()
        .then(handleResponse)
        .then((dtos) =>
            dtos.map(({ user_id, first_name, last_name, bio, avatar }) => ({
                userId: user_id,
                firstName: first_name,
                lastName: last_name,
                bio: bio ?? '',
                avatar,
            }))
        );
};

export const insertSignupInfo = async (supabaseClient: SupabaseClient<Database>,
    info: FurtherProfileInfo & { email: string }
) =>
    supabaseClient
        .from('signup_info')
        .insert(info)
        .select()
        .single();
