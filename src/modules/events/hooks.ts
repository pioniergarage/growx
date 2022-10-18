import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { User } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';


import { useMutation, useQuery, useQueryClient } from 'react-query';
import QUERY_KEYS from 'utils/queryKeys';
import growEventApi from './api';
import { GrowEvent } from './types';

export function useRegisterUserToEvent() {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient<Database>();
    const mutation = useMutation(
        async ({
            user,
            event,
            present,
        }: {
            user: User;
            event: GrowEvent;
            present: boolean;
        }) => {
            return growEventApi.registerUser(supabaseClient, user.id, event.id, present);
        },
        {
            onSuccess: () =>
                queryClient.invalidateQueries(QUERY_KEYS.registrationsOfUser()),
        }
    );
    return { ...mutation, registerUser: mutation.mutateAsync };
}

export function useUnregisterUserFromEvent() {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient<Database>();
    const mutation = useMutation(
        async ({ user, event }: { user: User; event: GrowEvent }) => {
            return growEventApi.unregisterUser(supabaseClient, user.id, event.id);
        },
        {
            onSuccess: () =>
                queryClient.invalidateQueries(QUERY_KEYS.registrationsOfUser()),
        }
    );
    return { ...mutation, unregisterUser: mutation.mutateAsync };
}

export function useRegistrationsToEvent(event: GrowEvent) {
    const supabaseClient = useSupabaseClient<Database>();
    const query = useQuery(
        QUERY_KEYS.registrationsToEvent(event.id),
        async () => await growEventApi.getRegistrationsTo(supabaseClient, event.id)
    );
    return { ...query, registrations: query.data };
}

export function useRegistrationsOfUser(userId?: string) {
    const supabaseClient = useSupabaseClient<Database>();
    const query = useQuery(
        QUERY_KEYS.registrationsOfUser(userId),
        async () => {
            if (!userId) {
                throw new Error('Cannot fetch registrations of undefined user');
            }
            return await growEventApi.getRegistrationsOfUser(supabaseClient, userId);
        },
        { enabled: !!userId }
    );
    return { ...query, registrations: query.data };
}

export function useGrowEvent(id: number) {
    const supabaseClient = useSupabaseClient<Database>();
    const { data, ...rest } = useQuery(
        QUERY_KEYS.event(id),
        async () => await growEventApi.getEvent(supabaseClient, id)
    );
    return { event: data, ...rest };
}

export function useGrowEvents() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const { data, ...rest } = useQuery(
        QUERY_KEYS.events(),
        async () => await growEventApi.getEvents(supabaseClient),
        {
            onSuccess: (events) =>
                events.forEach((event) =>
                    queryClient.setQueryData(QUERY_KEYS.event(event.id), event)
                ),
        }
    );
    return { events: data, ...rest };
}

export function useUpdateEvent() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (patch: GrowEvent) =>
            await growEventApi.updateEvent(supabaseClient, patch),
        {
            onSuccess: (updated) => {
                queryClient.setQueryData(QUERY_KEYS.event(updated.id), updated);
            },
        }
    );
    return { ...mutation, updateEvent: mutation.mutateAsync };
}

export function useDeleteEvent() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (eventId: number) => await growEventApi.deleteEvent(supabaseClient, eventId),
        {
            onSuccess: (_, eventId) => {
                queryClient.setQueryData(QUERY_KEYS.event(eventId), undefined);
            },
        }
    );
    return { ...mutation, deleteEvent: mutation.mutateAsync };
}

export function useInsertEvent() {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient<Database>();
    const mutation = useMutation(async (event: Partial<GrowEvent>) => await growEventApi.insertEvent(supabaseClient, event), {
        onSuccess: (created) => {
            queryClient.setQueryData(QUERY_KEYS.event(created.id), created);
            const oldEvents: GrowEvent[] = queryClient.getQueryData(QUERY_KEYS.events()) as GrowEvent[];
            queryClient.setQueryData(QUERY_KEYS.events(), [...oldEvents, created]);
        },
    });
    return { ...mutation, insertEvent: mutation.mutateAsync };
}
