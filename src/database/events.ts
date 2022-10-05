import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { GrowEvent } from 'model';
import { EventType } from './../model/index';
import { mapProfileDto } from './profile';
import { definitions } from './supabase';
import { handleResponse, handleSingleResponse } from './utils';

export const mapEventDto: (dto: definitions['events']) => GrowEvent = (
    dto
) => ({
    date: new Date(dto.date),
    id: dto.id,
    title: dto.title,
    description: dto.description,
    mandatory: dto.mandatory,
    location: dto.location,
    sq_mandatory: dto.sq_mandatory,
    type: dto.type as EventType,
});

export const getEvents = () =>
    supabaseClient
        .from<definitions['events']>('events')
        .select('*')
        .order('date')
        .then((response) => handleResponse(response, 'Events not found'))
        .then((dtos) => dtos.map(mapEventDto));

export const getEvent = (eventId: number) =>
    supabaseClient
        .from<definitions['events']>('events')
        .select('*')
        .match({ id: eventId })
        .single()
        .then((response) =>
            handleSingleResponse(response, `Event ${eventId} not found`)
        )
        .then(mapEventDto);

export const insertEvent: (
    event: Omit<Partial<GrowEvent>, 'tags' | 'types' | 'date'>
) => Promise<GrowEvent> = async (event) =>
    await supabaseClient
        .from<definitions['events']>('events')
        .insert(
            { ...event, date: new Date().toISOString() },
            { returning: 'representation' }
        )
        .single()
        .then((response) =>
            handleSingleResponse(response, 'Something went wrong')
        )
        .then(mapEventDto);

export const deleteEvent = (eventId: number) =>
    supabaseClient
        .from<definitions['events']>('events')
        .delete({ returning: 'minimal' })
        .match({ id: eventId })
        .single()
        .then(({ error }) => {
            if (error) {
                throw new Error(error.message);
            }
        });

export const updateEvent = (
    growEvent: Partial<GrowEvent> & Pick<GrowEvent, 'id'>
) =>
    supabaseClient
        .from<definitions['events']>('events')
        .update(
            {
                title: growEvent.title,
                date: growEvent.date ? growEvent.date.toISOString() : undefined,
                description: growEvent.description,
                mandatory: growEvent.mandatory,
                location: growEvent.location,
                sq_mandatory: growEvent.sq_mandatory,
                type: growEvent.type,
            },
            { returning: 'representation' }
        )
        .match({ id: growEvent.id })
        .single()
        .then((response) =>
            handleSingleResponse(response, 'Could not update event')
        )
        .then(mapEventDto);

export const registerUser = (
    userId: string,
    eventId: number,
    present: boolean
) =>
    supabaseClient
        .from<definitions['event_registrations']>('event_registrations')
        .insert({ user_id: userId, event_id: eventId, present })
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });

export const unregisterUser = async (userId: string, eventId: number) =>
    await supabaseClient
        .from<definitions['event_registrations']>('event_registrations')
        .delete({ returning: 'minimal' })
        .match({ event_id: eventId, user_id: userId })
        .single()
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });

export const getRegistrationsOfUser = (user_id: string) =>
    supabaseClient
        .from<Pick<definitions['event_registrations'], 'event_id' | 'present'>>(
            'event_registrations'
        )
        .select('event_id, present')
        .match({ user_id })
        .then((response) =>
            handleResponse(response, 'Could not find registrations')
        )
        .then((dtos) =>
            dtos.map((e) => ({ eventId: e.event_id, present: e.present }))
        );

export const getRegistrationsTo = (event_id: number) =>
    supabaseClient
        .from<{ profiles: definitions['profiles'] }>('event_registrations')
        .select('profiles (*)')
        .match({ event_id })
        .then((response) =>
            handleResponse(response, 'Could not load registrations')
        )
        .then((dtos) => dtos.map((r) => r.profiles).map(mapProfileDto));
