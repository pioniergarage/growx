import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';
import { Profile } from 'modules/profile/types';
import { handleEmptyResponse, handleResponse, handleSingleResponse } from '../../database/utils';
import { GrowEvent } from './types';

interface GrowEventApi {
    getEvents: (supabase: SupabaseClient<Database>) => Promise<GrowEvent[]>
    getEvent: (supabase: SupabaseClient<Database>, id: number) => Promise<GrowEvent>
    insertEvent: (supabase: SupabaseClient<Database>, event: Partial<Omit<GrowEvent, "id">>) => Promise<GrowEvent>
    updateEvent: (supabase: SupabaseClient<Database>, event: GrowEvent) => Promise<GrowEvent>
    deleteEvent: (supaabase: SupabaseClient<Database>, id: number) => Promise<void>

    registerUser: (supabase: SupabaseClient<Database>, user_id: string, event_id: number, present: boolean) => Promise<void>
    unregisterUser: (supabaseClient: SupabaseClient<Database>, userId: string, eventId: number) => Promise<void>
    getRegistrationsOfUser: (supabaseClient: SupabaseClient<Database>, user_id: string) => Promise<{ eventId: number, present: boolean }[]>
    getRegistrationsTo: (supabaseClient: SupabaseClient<Database>, event_id: number) => Promise<{ present: boolean, profile: Profile }[]>
}

const growEventApi: GrowEventApi = {
    async getEvents(supabase) {
        return await supabase
            .from('events')
            .select('*')
            .order('date')
            .then(handleResponse)
            .then((dtos) => dtos.map(mapEventDto));
    },
    async getEvent(supabase, id) {
        return await supabase
            .from('events')
            .select('*')
            .eq("id", id)
            .single()
            .then(handleSingleResponse)
            .then(mapEventDto);
    },
    async insertEvent(supabase, event) {
        return await supabase
            .from('events')
            .insert({ location: event.location ?? '' })
            .select()
            .single()
            .then(handleSingleResponse)
            .then(mapEventDto);
    },
    async updateEvent(supabase, event) {
        return await supabase
            .from('events')
            .update({ ...event, date: event.date.toISOString() })
            .eq("id", event.id)
            .select()
            .single()
            .then(handleSingleResponse)
            .then(mapEventDto);
    },
    async deleteEvent(supaabase, id) {
        return await supaabase
            .from('events')
            .delete()
            .eq("id", id)
            .then(handleEmptyResponse);
    },


    async registerUser(supabase, userId, eventId, present) {
        return await supabase
            .from('event_registrations')
            .insert({ user_id: userId, event_id: eventId, present })
            .then(handleEmptyResponse)
    },

    async unregisterUser(supabaseClient, userId, eventId) {
        return await supabaseClient
            .from('event_registrations')
            .delete()
            .match({ event_id: eventId, user_id: userId })
            .then(handleEmptyResponse)
    },

    async getRegistrationsOfUser(supabaseClient, user_id) {
        return await supabaseClient
            .from('event_registrations')
            .select('event_id, present')
            .match({ user_id })
            .then(handleResponse)
            .then((dtos) =>
                dtos.map((e) => ({ eventId: e.event_id, present: e.present }))
            )
    },

    async getRegistrationsTo(supabaseClient, event_id) {
        return await supabaseClient
            .from(
                'event_registrations'
            )
            .select('present, profile (*)')
            .match({ event_id })
            .then(handleResponse)
            .then((dtos) =>
                dtos.map(({ present, profile }) => ({
                    present,
                    profile: profile as Database['public']['Tables']['profile']['Row'],
                }))
            )
    },
}

export default growEventApi;

export const mapEventDto: (dto: Database['public']['Tables']['events']['Row']) => GrowEvent = (
    dto
) => ({ ...dto, date: new Date(dto.date) });




