import EventForm from '@/components/events/EventForm';
import TimelineEvent from '@/components/events/TimelineEvent';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import ProfileCard from '@/components/profile/ProfileCard';
import {
    Box,
    Divider,
    Heading,
    HStack,
    SimpleGrid,
    Spinner,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import {
    useDeleteEvent,
    useGrowEvent,
    useRegistrationsToEvent,
    useUpdateEvent,
} from 'hooks/event';
import { GrowEvent } from 'model';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

function Registrations(event: GrowEvent) {
    const { registrations } = useRegistrationsToEvent(event);

    return (
        <Box>
            <Heading size="sm" mb={2}>
                {registrations?.length || 0} Registrations
            </Heading>
            <SimpleGrid columns={2} gap={2}>
                {registrations?.map((registration) => (
                    <HStack key={registration.profile.userId}>
                        <Box fontSize={10} width={12}>
                            {registration.present ? 'In Person' : 'Online'}
                        </Box>
                        <ProfileCard
                            firstName={registration.profile.firstName}
                            lastName={registration.profile.lastName}
                            email={registration.profile.email}
                            avatar={registration.profile.avatar}
                            userId={registration.profile.userId}
                        />
                    </HStack>
                ))}
            </SimpleGrid>
        </Box>
    );
}

const EventDetails: NextPageWithLayout = () => {
    const toast = useToast();
    const router = useRouter();
    const eventId = Number.parseInt(router.query.eventId as string);

    const { event: initialEvent } = useGrowEvent(eventId);
    const [editingEvent, setEditingEvent] = useState(initialEvent);
    useEffect(() => setEditingEvent(initialEvent), [initialEvent]);
    const { updateEvent, isLoading: updating } = useUpdateEvent();
    const { deleteEvent } = useDeleteEvent();

    async function saveEvent(patch: Partial<GrowEvent>) {
        if (!initialEvent) return;
        try {
            updateEvent({ ...patch, id: initialEvent.id });
            toast({
                title: 'Event saved',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Could not save event',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    async function handleDeleteEvent() {
        try {
            await deleteEvent(eventId);
            router.push('/connect/admin/events');
        } catch (error) {
            toast({
                title: 'Could not delete event',
                status: 'error',
            });
        }
    }

    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4}>
            <AdminBreadcrumbs
                route={[
                    ['Events', '/connect/admin/events'],
                    [
                        initialEvent?.title || '',
                        `/connect/admin/events/${initialEvent?.id}`,
                    ],
                ]}
            />
            {initialEvent && editingEvent ? (
                <>
                    <VStack alignItems="start">
                        <Heading size="sm">Preview</Heading>
                        <Box maxW="xl">
                            <TimelineEvent event={editingEvent} />
                        </Box>
                    </VStack>
                    <EventForm
                        onSubmit={saveEvent}
                        onChange={(updated) =>
                            setEditingEvent({ id: initialEvent.id, ...updated })
                        }
                        initialValue={initialEvent}
                        loading={updating}
                        onDelete={handleDeleteEvent}
                    />
                    <Divider />
                    <Registrations {...initialEvent} />
                </>
            ) : (
                <Spinner />
            )}
        </VStack>
    );
};

export default EventDetails;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
