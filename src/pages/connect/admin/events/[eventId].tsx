import AdminBreadcrumbs, {
    AdminBreadcrumbItem,
} from '@/components/navigation/AdminBreadcrumbs';
import { Divider, Spinner, useToast, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import EventConfiguration from 'modules/events/components/EventConfiguration';

import Registrations from 'modules/events/components/Registraions';
import {
    useDeleteEvent,
    useGrowEvent,
    useUpdateEvent,
} from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'utils/types';

const EventDetails: NextPageWithLayout = () => {
    const toast = useToast();
    const router = useRouter();
    const eventId = Number.parseInt(router.query.eventId as string);

    const { event, isLoading } = useGrowEvent(eventId);

    const { updateEvent, isLoading: isUpdating } = useUpdateEvent();
    const { deleteEvent } = useDeleteEvent();

    async function handleSave(event: GrowEvent) {
        try {
            await updateEvent(event);
            toast({
                title: 'Event saved',
                status: 'success',
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Could not save event',
                status: 'error',
                isClosable: true,
            });
        }
    }

    async function handleDelete() {
        try {
            await deleteEvent(eventId);
            router.push('/connect/admin/events');
        } catch (error) {
            toast({
                title: 'Could not delete event',
                status: 'error',
                isClosable: true,
            });
        }
    }

    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4}>
            <AdminBreadcrumbs>
                <AdminBreadcrumbItem href="/connect/admin/events">
                    Events
                </AdminBreadcrumbItem>
                <AdminBreadcrumbItem
                    href={`/connect/admin/events/${event?.id}`}
                >
                    {event?.title}
                </AdminBreadcrumbItem>
            </AdminBreadcrumbs>

            {isLoading && <Spinner />}
            {event && (
                <>
                    <EventConfiguration
                        initialEvent={event}
                        onDelete={handleDelete}
                        onSave={handleSave}
                        isLoading={isUpdating}
                    />
                    <Divider />
                    <Registrations eventId={event.id} eventName={event.title} />
                </>
            )}
        </VStack>
    );
};

export default EventDetails;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
