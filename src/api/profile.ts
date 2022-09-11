import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Profile } from 'model';
import { definitions } from './supabase';
import { handleResponse, handleSingleResponse } from './utils';

export const mapProfileDto: (dto: definitions['profiles']) => Profile = (
    dto
) => ({
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
    avatar: dto.avatar,
    skills: dto.skills as string[],
});

export async function fetchProfile(user_id: string): Promise<Profile> {
    return supabaseClient
        .from<definitions['profiles']>('profiles')
        .select('*')
        .eq('user_id', user_id)
        .single()
        .then((response) => handleSingleResponse(response, 'Profile not found'))
        .then(mapProfileDto);
}

export const updateProfile = async (
    profile: Partial<Profile> & Pick<Profile, 'userId'>
) =>
    supabaseClient
        .from<definitions['profiles']>('profiles')
        .update(
            {
                first_name: profile.firstName,
                last_name: profile.lastName,
                email: profile.email,
                phone: profile.phone,
                studies: profile.studies,
                university: profile.university,
                homeland: profile.homeland,
                gender: profile.gender,
                avatar: profile.avatar,
                skills: profile.skills,
            },
            { returning: 'representation' }
        )
        .match({ user_id: profile.userId })
        .single()
        .then((response) => handleSingleResponse(response, 'Profile not found'))
        .then(mapProfileDto);

export const getProfiles = async (): Promise<Profile[]> => {
    return supabaseClient
        .from<definitions['profiles']>('profiles')
        .select('*')
        .then((response) => handleResponse(response, 'No profiles found'))
        .then((dtos) => dtos.map(mapProfileDto));
};
