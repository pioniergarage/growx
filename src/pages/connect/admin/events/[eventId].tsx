import AdminBreadcrumbs, {
    AdminBreadcrumbItem,
} from '@/components/navigation/AdminBreadcrumbs';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Divider, Spinner, useToast, VStack } from '@chakra-ui/react';
import { withPageAuth } from 'utils/supabase/withPageAuth';

import { allowOrga } from 'modules/admin/utils';
import EventConfiguration from 'modules/events/components/EventConfiguration';

import Registrations from 'modules/events/components/Registrations';
import {
    useDeleteEvent,
    useGrowEventWithSeats,
    useUpdateEvent,
} from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'utils/types';

const EventDetails: NextPageWithLayout = () => {
    const toast = useToast();
    const router = useRouter();
    const eventId = Number.parseInt(router.query.eventId as string);

    const { event, isLoading } = useGrowEventWithSeats(eventId);

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
        <VStack alignItems="stretch" gap={4}>
            <AdminBreadcrumbs>
                <AdminBreadcrumbItem href="/connect/admin/events">
                    Events
                    <ChevronRightIcon color="gray.500" mx={2} />
                </AdminBreadcrumbItem>
                <AdminBreadcrumbItem
                    href={`/connect/admin/events/${event?.id}`}
                >
                    {event?.title}
                </AdminBreadcrumbItem>
            </AdminBreadcrumbs>

            <Box padding='1em 0'>
                <p>This page is live from the database. Changes made here may not immediately be visible on the public site.</p>
            </Box>

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
    getServerSideProps: allowOrga,
});
