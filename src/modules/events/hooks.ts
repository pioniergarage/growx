import { useSupabaseClient } from '@/components/providers/SupabaseProvider';

import { User } from '@supabase/supabase-js';

import {
    deleteEvent,
    getEvent,
    getEvents,
    getEventsWithSeats,
    getEventWithSeats,
    getRegistrationsOfUser,
    getRegistrationsTo,
    insertEvent,
    registerUser,
    unregisterUser,
    updateEvent,
} from 'modules/events/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GrowEvent, GrowEventWithSeats } from './types';

export function useRegisterUserToEvent() {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();
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
            return registerUser(supabaseClient, user.id, event.id, present);
        },
        {
            onSuccess: () =>
                queryClient.invalidateQueries(['eventRegistrationsOfUser']),
        }
    );
    return { ...mutation, registerUser: mutation.mutateAsync };
}

export function useUnregisterUserFromEvent() {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();
    const mutation = useMutation(
        async ({ user, event }: { user: User; event: GrowEvent }) => {
            return unregisterUser(supabaseClient, user.id, event.id);
        },
        {
            onSuccess: () =>
                queryClient.invalidateQueries(['eventRegistrationsOfUser']),
        }
    );
    return { ...mutation, unregisterUser: mutation.mutateAsync };
}

export function useRegistrationsToEvent(eventId: number) {
    const supabaseClient = useSupabaseClient();
    const query = useQuery(
        ['eventRegistrations', eventId],
        async () => await getRegistrationsTo(supabaseClient, eventId)
    );
    return { ...query, registrations: query.data };
}

export function useRegistrationsOfUser(userId?: string) {
    const supabaseClient = useSupabaseClient();
    const query = useQuery(
        ['eventRegistrationsOfUser', userId],
        async () => {
            if (!userId) {
                throw new Error('Cannot fetch registrations of undefined user');
            }
            return await getRegistrationsOfUser(supabaseClient, userId);
        },
        { enabled: !!userId }
    );
    return { ...query, registrations: query.data };
}

export function useGrowEvent(id: number) {
    const supabaseClient = useSupabaseClient();
    const { data, ...rest } = useQuery(
        ['event', id],
        async () => await getEvent(supabaseClient, id)
    );
    return { event: data, ...rest };
}

export function useGrowEventWithSeats(id: number) {
    const supabaseClient = useSupabaseClient();
    const { data, ...rest } = useQuery(
        ['eventWithSeats', id],
        async () => await getEventWithSeats(supabaseClient, id)
    );
    return { event: data, ...rest };
}

export function useGrowEvents() {
    const supabaseClient = useSupabaseClient();
    const queryClient = useQueryClient();
    const { data, ...rest } = useQuery(
        'events',
        async () => await getEvents(supabaseClient),
        {
            onSuccess: (events) =>
                events.forEach((event) => //Error here: Parameter 'event' implicitly has an 'any' type.
                    queryClient.setQueryData(['event', event.id], event)
                ),
        }
    );
    return { events: data ?? [], ...rest };
}

export function useGrowEventsWithSeats() {
    const supabaseClient = useSupabaseClient();
    const queryClient = useQueryClient();
    const { data, ...rest } = useQuery(
        'eventsWithSeats',
        async () => await getEventsWithSeats(supabaseClient),
        {
            onSuccess: (events) =>
                events.forEach((event) =>
                    queryClient.setQueryData(
                        ['eventWithSeats', event.id],
                        event
                    )
                ),
        }
    );
    return { events: data ?? [], ...rest };
}

export function useUpdateEvent() {
    const supabaseClient = useSupabaseClient();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (patch: Partial<GrowEventWithSeats> & Pick<GrowEvent, 'id'>) =>
            await updateEvent(supabaseClient, patch),
        {
            onSuccess: (updated) => {
                queryClient.setQueryData(['event', updated.id], updated);
            },
        }
    );
    return { ...mutation, updateEvent: mutation.mutateAsync };
}

export function useDeleteEvent() {
    const supabaseClient = useSupabaseClient();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (eventId: number) => await deleteEvent(supabaseClient, eventId),
        {
            onSuccess: (_, eventId) => {
                queryClient.setQueryData(['event', eventId], undefined);
            },
        }
    );
    return { ...mutation, deleteEvent: mutation.mutateAsync };
}

export function useInsertEvent() {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();
    const mutation = useMutation(
        async (event: Partial<GrowEvent>) =>
            await insertEvent(supabaseClient, event),
        {
            onSuccess: (created) => {
                queryClient.setQueryData(['event', created.id], created);
                const oldEvents: GrowEvent[] = queryClient.getQueryData(
                    'events'
                ) as GrowEvent[] ?? [];
                queryClient.setQueryData('events', [...oldEvents, created]);
            },
        }
    );
    return { ...mutation, insertEvent: mutation.mutateAsync };
}
