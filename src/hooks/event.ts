import { User } from '@supabase/supabase-js';
import {
    deleteEvent,
    getEvent,
    getEvents,
    getRegistrationsOfUser,
    getRegistrationsTo,
    insertEvent,
    registerUser,
    unregisterUser,
    updateEvent,
} from 'api/events';
import { GrowEvent } from 'model';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useRegisterUserToEvent() {
    const mutation = useMutation(
        async ({ user, event }: { user: User; event: GrowEvent }) => {
            return registerUser(user.id, event.id);
        }
    );
    return { ...mutation, registerUser: mutation.mutateAsync };
}

export function useUnregisterUserFromEvent() {
    const mutation = useMutation(
        async ({ user, event }: { user: User; event: GrowEvent }) => {
            return unregisterUser(user.id, event.id);
        }
    );
    return { ...mutation, unregisterUser: mutation.mutateAsync };
}

export function useRegistrationsToEvent(event: GrowEvent) {
    const query = useQuery(
        ['eventRegistrations', event.id],
        async () => await getRegistrationsTo(event.id)
    );
    return { ...query, registeredUsers: query.data };
}

export function useRegistrationsOfUser(userId?: string) {
    const query = useQuery(
        ['eventRegistrationsOfUser', userId],
        async () => {
            if (!userId) {
                throw new Error('Cannot fetch registrations of undefined user');
            }
            return await getRegistrationsOfUser(userId);
        },
        { enabled: !!userId }
    );
    return { ...query, eventIds: query.data };
}

export function useGrowEvent(id: number) {
    const { data, ...rest } = useQuery(
        ['event', id],
        async () => await getEvent(id)
    );
    return { event: data, ...rest };
}

export function useGrowEvents() {
    const queryClient = useQueryClient();
    const { data, ...rest } = useQuery(
        'events',
        async () => await getEvents(),
        {
            onSuccess: (events) =>
                events.forEach((event) =>
                    queryClient.setQueryData(['event', event.id], event)
                ),
        }
    );
    return { events: data, ...rest };
}

export function useUpdateEvent() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (patch: Partial<GrowEvent> & Pick<GrowEvent, 'id'>) =>
            await updateEvent(patch),
        {
            onSuccess: (updated) => {
                queryClient.setQueryData(['event', updated.id], updated);
            },
        }
    );
    return { ...mutation, updateEvent: mutation.mutateAsync };
}

export function useDeleteEvent() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (eventId: number) => await deleteEvent(eventId),
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
    const mutation = useMutation(insertEvent, {
        onSuccess: (created) => {
            queryClient.setQueryData(['event', created.id], created);
            const oldEvents: GrowEvent[] = queryClient.getQueryData(
                'events'
            ) as GrowEvent[];
            queryClient.setQueryData('events', [...oldEvents, created]);
        },
    });
    return { ...mutation, insertEvent: mutation.mutateAsync };
}
