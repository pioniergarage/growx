import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import {
    GrowEvent,
    GrowEventDto,
    Profile,
    ProfileDto,
    Sponsor,
    UserRole,
} from 'types';
import resizeImage from 'utils/resize';

export const fetchUserAvatar = async (userId: string) =>
    await supabaseClient.storage.from('avatars').download(`${userId}.jpg`);

export const uploadUserAvatar = async (profile: Profile, avatar: File) => {
    const fileName = `${profile?.user_id}.jpg`;
    const filePath = `${fileName}`;
    const resizedImage = await resizeImage(avatar, 200, 200);
    return await supabaseClient.storage
        .from('avatars')
        .upload(filePath, resizedImage, { upsert: true });
};

export const registerUser = async (userId: string, eventId: number) =>
    await supabaseClient
        .from('registrations')
        .insert({ user_id: userId, event_id: eventId });

export const unregisterUser = async (userId: string, eventId: number) =>
    await supabaseClient
        .from('registrations')
        .delete()
        .match({ event_id: userId, user_id: eventId });

export const getRegistrationsOfUser = async (user_id: string) =>
    await supabaseClient
        .from<{ user_id: string; event_id: number }>('registrations')
        .select('event_id')
        .match({ user_id });

export const getRegistrationsTo = async (event_id: number) => {
    const { data, error } = await supabaseClient
        .from<{ profiles: ProfileDto }>('registrations')
        .select(
            `
            profiles (
                *
            )
        `
        )
        .match({ event_id });
    if (data) {
        return { error, data: data.map((d) => d.profiles) };
    }
    return { data, error };
};

export const getSponsors = async () =>
    await supabaseClient.from<Sponsor>('sponsors').select('*');

export const upsertSponsor = async (sponsor: Sponsor) =>
    await supabaseClient
        .from<Sponsor>('sponsors')
        .upsert(sponsor)
        .match({ id: sponsor.id })
        .single();

export const deleteSponsor = async (id: number) =>
    await supabaseClient.from<Sponsor>('sponsors').delete().match({ id });

export const getProfile = async (user_id: string) =>
    await supabaseClient
        .from<ProfileDto & { user_roles: { role: UserRole }[] }>('profiles')
        .select(
            `
        *,
        user_roles (
            role
        )
    `
        )
        .eq('user_id', user_id)
        .single();

export const updateProfile = async (userId: string, dto: ProfileDto) =>
    await supabaseClient
        .from<ProfileDto>('profiles')
        .update(dto, { returning: 'minimal' })
        .eq('user_id', userId);

export const getProfiles = async () =>
    await supabaseClient.from<ProfileDto>('profiles').select('*');

export const getFAQs = async () =>
    await supabaseClient.from('faqs').select('*');

export const getEvents = async () => {
    const { data, error } = await supabaseClient
        .from<GrowEventDto & { event_types: { type: string } }>('events')
        .select(
            `
            *,
            event_types (type)
            `
        )
        .order('date');
    if (data) {
        return {
            error,
            data: data.map((e) => {
                const { event_types, ...rest } = e;
                return { ...rest, type: event_types.type };
            }),
        };
    }
    return { data, error };
};

export const getEvent = async (eventId: number) => {
    const { data, error } = await supabaseClient
        .from<GrowEventDto & { event_types: { type: string } }>('events')
        .select(
            `
            *, 
            event_types (type)
             `
        )
        .match({ id: eventId })
        .single();

    if (data) {
        const { event_types, ...rest } = data;
        return {
            error,
            data: { ...rest, type: event_types.type },
        };
    }
    return { data, error };
};

export const createEvent = async (growEvent: Partial<GrowEvent>) =>
    await supabaseClient.from<GrowEvent>('events').insert(growEvent).single();

export const deleteEvent = async (eventId: number) =>
    await supabaseClient
        .from<GrowEventDto>('events')
        .delete({ returning: 'minimal' })
        .match({ id: eventId });

export const updateEvent = async (eventId: number, patch: Partial<GrowEvent>) =>
    await supabaseClient
        .from<GrowEvent>('events')
        .update(patch)
        .match({ id: eventId });
