import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';
import { handleResponse, handleSingleResponse } from '../../database/utils';
import { mapProfileDto } from '../profile/api';
import { EventCategory, EventType, GrowEvent, GrowEventWithSeats } from './types';

export const mapEventDto: (
    dto: Database['public']['Tables']['events']['Row']
) => GrowEvent = (dto) => ({
    id: dto.id,
    ref: dto.ref as string,
    location: dto.location,
    title: dto.title,
    date: new Date(dto.date + 'Z'),
    description: dto.description,
    mandatory: dto.mandatory,
    type: dto.type as EventType,
    duration: dto.duration,
    availableSeats: dto.available_seats,
    eventCategory: dto.event_category as EventCategory
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
        .order('date')
        .match({ id: eventId })
        .single()
        .then(handleSingleResponse)
        .then(mapEventDto);

//TODO: These are broken until the Views can be restored on the database.

export const getEventWithSeats = (
    supabaseClient: SupabaseClient<Database>,
    eventId: number
) =>
    supabaseClient
        .from('events') //This should be 'event_with_seats'!
        .select('*')
        .match({ id: eventId })
        .single()
        .then(handleSingleResponse)
        .then(
            (dto) =>
                dto as Database['public']['Tables']['events']['Row'] & {
                    seats_left: number;
                }
        )
        .then((dto) => ({
            ...mapEventDto(dto),
            presenceSeatsLeft:
                (dto.seats_left as number) ?? dto.available_seats,
        }));

export const getEventsWithSeats = (supabaseClient: SupabaseClient<Database>) =>
    supabaseClient
        .from('events') //This should be 'event_with_seats'!
        .select('*')
        .order('date')
        .then(handleResponse)
        .then((dtos) =>
            dtos.map(
                (dto) =>
                    dto as Database['public']['Tables']['events']['Row'] & {
                        seats_left: number;
                    }
            )
        )
        .then((dtos) =>
            dtos.map(({ seats_left, ...dto }) => ({
                ...mapEventDto(dto),
                presenceSeatsLeft: (seats_left as number) ?? dto.available_seats,
            }))
        );

export const insertEvent = (
    supabaseClient: SupabaseClient<Database>,
    event: Partial<GrowEvent>
) => {
    return supabaseClient
        .from('events')
        .insert({
            title: event.title,
            description: event.description,
            mandatory: event.mandatory,
            location: event.location ?? '',
            type: event.type,
            duration: event.duration,
        })
        .select()
        .single()
        .then(handleSingleResponse)
        .then(mapEventDto);
};

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
    growEvent: Partial<GrowEventWithSeats> & Pick<GrowEvent, 'id'>
) =>
    supabaseClient
        .from('events')
        .update({
            title: growEvent.title,
            date: growEvent.date ? growEvent.date.toISOString() : undefined,
            description: growEvent.description,
            mandatory: growEvent.mandatory,
            location: growEvent.location,
            type: growEvent.type,
            duration: growEvent.duration,
            available_seats: growEvent.availableSeats,
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
                        contact_information: Database['public']['Tables']['contact_information']['Row'];
                    },
            }))
        )
        .then((dtos) =>
            dtos.map(({ present, profile }) => ({
                present,
                profile: mapProfileDto(profile),
                contact_information: profile.contact_information,
            }))
        );
    return result;
};
