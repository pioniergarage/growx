import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { FurtherProfileInfo, Profile, PublicMentorProfile } from 'model';
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
    universityCountry: dto.universityCountry,
    gender: dto.gender,
    role: dto.role,
    avatar: dto.avatar,
    skills: dto.skills as string[],
    bio: dto.bio || '',
    keyQualification: dto.keyQualification,
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
                universityCountry: profile.universityCountry,
                homeland: profile.homeland,
                gender: profile.gender,
                avatar: profile.avatar,
                skills: profile.skills,
                role: profile.role,
                bio: profile.bio,
                keyQualification: profile.keyQualification,
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

export const getPublicMentors = async (): Promise<PublicMentorProfile[]> => {
    return supabaseClient
        .from<definitions['profiles']>('profiles')
        .select('user_id, first_name, last_name, avatar, bio')
        .match({ role: 'MENTOR' })
        .then((response) => handleResponse(response, 'No mentors found'))
        .then((dtos) => dtos.map(({ user_id, first_name, last_name, bio, avatar }) => ({
            userId: user_id,
            firstName: first_name,
            lastName: last_name,
            bio: bio ?? '',
            avatar
        })));
}

export const insertSignupInfo = async (
    info: FurtherProfileInfo & { email: string }
) =>
    supabaseClient
        .from<definitions['signup_info']>('signup_info')
        .insert(info)
        .single();
