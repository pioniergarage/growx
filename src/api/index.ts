import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import {
    PostgrestError,
    PostgrestResponse,
    PostgrestSingleResponse,
} from '@supabase/supabase-js';
import {
    eventTypeIdToString,
    GrowEvent,
    Profile,
    Sponsor,
    UserRole,
} from 'model';
import resizeImage from 'utils/resize';
import { definitions } from './supabase';

type SupabaseResponse<T> = { data?: T; error?: PostgrestError | null };
function mapResponse<DataIn, DataOut>(
    response: PostgrestResponse<DataIn>,
    mapper: (data: DataIn) => DataOut
): SupabaseResponse<DataOut[]> {
    const { data, error } = response;
    if (!data) {
        return { error };
    }
    return { data: data.map(mapper) };
}
function mapSingleResponse<DataIn, DataOut>(
    response: PostgrestSingleResponse<DataIn>,
    mapper: (data: DataIn) => DataOut
): SupabaseResponse<DataOut> {
    const { data, error } = response;
    if (!data) {
        return { error };
    }
    return { data: mapper(data) };
}

export const fetchUserAvatar = async (userId: string) =>
    await supabaseClient.storage.from('avatars').download(`${userId}.jpg`);

export const uploadUserAvatar = async (profile: Profile, avatar: File) => {
    const fileName = `${profile.userId}.jpg`;
    const filePath = `${fileName}`;
    const resizedImage = await resizeImage(avatar, 200, 200);
    return await supabaseClient.storage
        .from('avatars')
        .upload(filePath, resizedImage, { upsert: true });
};

export const registerUser = async (userId: string, eventId: number) =>
    await supabaseClient
        .from<definitions['registrations']>('registrations')
        .insert({ user_id: userId, event_id: eventId });

export const unregisterUser = async (userId: string, eventId: number) =>
    await supabaseClient
        .from<definitions['registrations']>('registrations')
        .delete({ returning: 'minimal' })
        .match({ event_id: eventId, user_id: userId });

export const getRegistrationsOfUser = async (user_id: string) => {
    const response = await supabaseClient
        .from<Pick<definitions['registrations'], 'event_id'>>('registrations')
        .select('event_id')
        .match({ user_id });
    return mapResponse(response, (e) => ({ eventId: e.event_id }));
};

export const getRegistrationsTo = async (event_id: number) => {
    const response = await supabaseClient
        .from<{
            profiles: definitions['profiles'] & {
                user_roles: Pick<definitions['user_roles'], 'role'>;
            };
        }>('registrations')
        .select('profiles (*, user_roles (role))')
        .match({ event_id });
    return mapResponse(response, (d) => mapProfileDto(d.profiles));
};

export async function getSponsors(): Promise<SupabaseResponse<Sponsor[]>> {
    const response = await supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .select('*');
    return mapResponse(response, (s) => s);
}

export const upsertSponsor = async (sponsor: Sponsor) =>
    await supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .upsert(sponsor)
        .match({ id: sponsor.id })
        .single();

export const deleteSponsor = async (id: number) =>
    await supabaseClient
        .from<definitions['sponsors']>('sponsors')
        .delete()
        .match({ id });

const mapProfileDto = (
    dto: definitions['profiles'] & {
        user_roles: Pick<definitions['user_roles'], 'role'>;
    }
): Profile => ({
    userId: dto.user_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    email: dto.email,
    phone: dto.phone,
    studies: dto.studies,
    university: dto.university,
    homeland: dto.homeland,
    gender: dto.gender,
    role: dto.user_roles.role as UserRole,
});

export async function getProfile(
    user_id: string
): Promise<SupabaseResponse<Profile>> {
    const response = await supabaseClient
        .from<
            definitions['profiles'] & {
                user_roles: Pick<definitions['user_roles'], 'role'>;
            }
        >('profiles')
        .select('*, user_roles (role)')
        .eq('user_id', user_id)
        .single();
    return mapSingleResponse(response, mapProfileDto);
}

export const updateProfile = async (
    userId: string,
    profile: Partial<Profile>
) =>
    await supabaseClient
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
            },
            { returning: 'minimal' }
        )
        .eq('user_id', userId);

export const getProfiles = async (): Promise<SupabaseResponse<Profile[]>> => {
    const response = await supabaseClient
        .from<
            definitions['profiles'] & {
                user_roles: Pick<definitions['user_roles'], 'role'>;
            }
        >('profiles')
        .select('*, user_roles (role)');
    return mapResponse(response, mapProfileDto);
};

export const getFAQs = async () =>
    await supabaseClient.from<definitions['faqs']>('faqs').select('*');

export const getEvents = async () =>
    await supabaseClient
        .from<definitions['events']>('events')
        .select('*')
        .order('date');

export const getEvent = async (eventId: number) =>
    await supabaseClient
        .from<definitions['events']>('events')
        .select('*')
        .match({ id: eventId })
        .single();

export const createEvent = async () =>
    await supabaseClient
        .from<definitions['events']>('events')
        .insert(
            {
                title: 'New Event',
                date: new Date().toISOString(),
                // TODO: noch mehr?
            },
            { returning: 'minimal' }
        )
        .single();

export const deleteEvent = async (eventId: number) =>
    await supabaseClient
        .from<definitions['events']>('events')
        .delete({ returning: 'minimal' })
        .match({ id: eventId });

export const updateEvent = async (
    eventId: number,
    growEvent: Partial<GrowEvent>
) =>
    await supabaseClient
        .from<definitions['events']>('events')
        .update({
            title: growEvent.title,
            date: growEvent.date ? growEvent.date.toISOString() : undefined,
            description: growEvent.description,
            mandatory: growEvent.mandatory,
            location: growEvent.location,
            sq_mandatory: growEvent.sq_mandatory,
            type: growEvent.type, // TODO Partial{id: number, inserted_at: String}
        })
        .match({ id: eventId });

// TODO: https://stackoverflow.com/questions/229856/ways-to-save-enums-in-database
