import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';
import { handleResponse, handleSingleResponse } from '../../database/utils';
import { mapProfileDto } from '../profile/api';
import { EventType, GrowEvent } from './types';

export const mapEventDto: (
    dto: Database['public']['Tables']['events']['Row']
) => GrowEvent = (dto) => ({
    date: new Date(dto.date + 'Z'),
    id: dto.id,
    title: dto.title,
    description: dto.description,
    mandatory: dto.mandatory,
    location: dto.location,
    sq_mandatory: dto.sq_mandatory,
    type: dto.type as EventType,
    duration: dto.duration,
});

export const getEvents = (supabaseClient: SupabaseClient<Database>) =>
    supabaseClient
        .from('events')
        .select('*')
        .order('date')
        .then(handleResponse)
        .then((dtos) => dtos.map(mapEventDto));

export const getEvent = (
    supabaseClient: SupabaseClient<Database>,
    eventId: number
) =>
    supabaseClient
        .from('events')
        .select('*')
        .match({ id: eventId })
        .single()
        .then(handleSingleResponse)
        .then(mapEventDto);

export const getEventWithSeats = (
    supabaseClient: SupabaseClient<Database>,
    eventId: number
) =>
    supabaseClient
        .from('event_with_seats')
        .select('*')
        .match({ id: eventId })
        .single()
        .then(handleSingleResponse)
        .then((dto) => ({
            ...mapEventDto(dto),
            presenceSeatsLeft: dto.seats_left as number,
        }));

export const insertEvent = (
    supabaseClient: SupabaseClient<Database>,
    event: Partial<GrowEvent>
) =>
    supabaseClient
        .from('events')
        .insert({
            location: event.location ?? '',
        })
        .select()
        .single()
        .then(handleSingleResponse)
        .then(mapEventDto);

export const deleteEvent = (
    supabaseClient: SupabaseClient<Database>,
    eventId: number
) =>
    supabaseClient
        .from('events')
        .delete()
        .match({ id: eventId })
        .single()
        .then(({ error }) => {
            if (error) {
                throw error;
            }
        });

export const updateEvent = (
    supabaseClient: SupabaseClient<Database>,
    growEvent: Partial<GrowEvent> & Pick<GrowEvent, 'id'>
) =>
    supabaseClient
        .from('events')
        .update({
            title: growEvent.title,
            date: growEvent.date ? growEvent.date.toISOString() : undefined,
            description: growEvent.description,
            mandatory: growEvent.mandatory,
            location: growEvent.location,
            sq_mandatory: growEvent.sq_mandatory,
            type: growEvent.type,
            duration: growEvent.duration,
        })
        .match({ id: growEvent.id })
        .select()
        .single()
        .then(handleSingleResponse)
        .then(mapEventDto);

export const registerUser = (
    supabaseClient: SupabaseClient<Database>,
    userId: string,
    eventId: number,
    present: boolean
) =>
    supabaseClient
        .from('event_registrations')
        .insert({ user_id: userId, event_id: eventId, present })
        .then(({ error }) => {
            if (error) throw error;
        });

export const unregisterUser = (
    supabaseClient: SupabaseClient<Database>,
    userId: string,
    eventId: number
) =>
    supabaseClient
        .from('event_registrations')
        .delete()
        .match({ event_id: eventId, user_id: userId })
        .then(({ error }) => {
            if (error) throw error;
        });

export const getRegistrationsOfUser = (
    supabaseClient: SupabaseClient<Database>,
    user_id: string
) =>
    supabaseClient
        .from('event_registrations')
        .select('event_id, present')
        .match({ user_id })
        .then(handleResponse)
        .then((dtos) =>
            dtos.map((e) => ({ eventId: e.event_id, present: e.present }))
        );

export const getRegistrationsTo = async (
    supabaseClient: SupabaseClient<Database>,
    event_id: number
) => {
    const result = await supabaseClient
        .from('event_registrations')
        .select('present, profiles (*, contact_information(*))')
        .match({ event_id })
        .then(handleResponse)
        .then((dtos) =>
            dtos.map(({ present, profiles }) => ({
                present,
                profile:
                    profiles as Database['public']['Tables']['profiles']['Row'] & {
                        contact_information: Database['public']['Tables']['contact_information']['Row'][];
                    },
            }))
        )
        .then((dtos) =>
            dtos.map(({ present, profile }) => ({
                present,
                profile: mapProfileDto(profile),
                contact_information: profile.contact_information[0],
            }))
        );
    return result;
};
