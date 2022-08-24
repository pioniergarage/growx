import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { GrowEvent } from 'model';
import { mapProfileDto } from './profile';
import { definitions } from './supabase';
import { mapResponse } from './utils';

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
        })
        .match({ id: eventId });

export const registerUser = async (userId: string, eventId: number) =>
    await supabaseClient
        .from<definitions['event_registrations']>('event_registrations')
        .insert({ user_id: userId, event_id: eventId });

export const unregisterUser = async (userId: string, eventId: number) =>
    await supabaseClient
        .from<definitions['event_registrations']>('event_registrations')
        .delete({ returning: 'minimal' })
        .match({ event_id: eventId, user_id: userId });

export const getRegistrationsOfUser = async (user_id: string) => {
    const response = await supabaseClient
        .from<Pick<definitions['event_registrations'], 'event_id'>>(
            'event_registrations'
        )
        .select('event_id')
        .match({ user_id });
    return mapResponse(response, (e) => ({ eventId: e.event_id }));
};

export const getRegistrationsTo = async (event_id: number) => {
    const response = await supabaseClient
        .from<{ profiles: definitions['profiles'] }>('event_registrations')
        .select('profiles (*)')
        .match({ event_id });
    return mapResponse(response, (d) => mapProfileDto(d.profiles));
};
