import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Spinner,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import EventForm from 'modules/events/components/EventForm';
import TimelineEvent from 'modules/events/components/TimelineEvent';
import {
    useDeleteEvent,
    useGrowEvent,
    useRegistrationsToEvent,
    useUpdateEvent,
} from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import ProfileCard from 'modules/profile/components/ProfileCard';
import { Profile } from 'modules/profile/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { downloadCSV } from 'utils/csv';
import { NextPageWithLayout } from 'utils/types';

function Registrations(event: GrowEvent) {
    const { registrations } = useRegistrationsToEvent(event);

    function downloadRegistrations(
        registrations: {
            present: boolean;
            profile: Profile;
        }[] = []
    ) {
        downloadCSV(
            ['name', 'email', 'phone', 'online/person'],
            registrations.map(({ present, profile }) => [
                profile.firstName + ' ' + profile.lastName,
                profile.email,
                profile.phone || '',
                present ? 'in person' : 'online',
            ]),
            `${event.title}-registrations.csv`
        );
    }

    return (
        <Box>
            <Flex justifyContent="space-between">
                <Heading size="sm" mb={2}>
                    {registrations?.length || 0} Registrations
                </Heading>
                <Button
                    onClick={() => downloadRegistrations(registrations)}
                    disabled={!registrations}
                    size="sm"
                    variant="link"
                >
                    Download as CSV
                </Button>
            </Flex>
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
    const [isEditing, setEditing] = useState(false);

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
            setEditing(false);
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
                    <Flex justifyContent="space-between">
                        <Box maxW="xl">
                            <TimelineEvent event={editingEvent} />
                        </Box>
                        <Button
                            onClick={() => setEditing(true)}
                            isDisabled={isEditing}
                        >
                            Edit
                        </Button>
                    </Flex>
                    {isEditing ? (
                        <EventForm
                            onSubmit={saveEvent}
                            onChange={(updated) =>
                                setEditingEvent({
                                    id: initialEvent.id,
                                    ...updated,
                                })
                            }
                            initialValue={initialEvent}
                            loading={updating}
                            onDelete={handleDeleteEvent}
                            onCancel={() => setEditing(false)}
                        />
                    ) : undefined}
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
