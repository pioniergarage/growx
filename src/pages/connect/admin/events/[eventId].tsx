import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Spinner,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import UserAvatar from 'modules/avatar/components/UserAvatar';
import { ContactInformation } from 'modules/contactInformation/types';

import EventForm from 'modules/events/components/EventForm';
import TimelineEvent from 'modules/events/components/TimelineEvent';
import {
    useDeleteEvent,
    useGrowEvent,
    useRegistrationsToEvent,
    useUpdateEvent,
} from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import { Profile } from 'modules/profile/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaLaptop } from 'react-icons/fa';
import { downloadCSV } from 'utils/csv';
import { NextPageWithLayout } from 'utils/types';

function Registrations(event: GrowEvent) {
    const { registrations } = useRegistrationsToEvent(event);

    function downloadRegistrations(
        registrations: {
            present: boolean;
            profile: Profile;
            contact_information: ContactInformation;
        }[] = []
    ) {
        downloadCSV(
            ['name', 'email', 'phone', 'online/person', 'role'],
            registrations.map(({ present, profile, contact_information }) => [
                profile.firstName + ' ' + profile.lastName,
                contact_information.email,
                contact_information.phone || '',
                present ? 'in person' : 'online',
                profile.role,
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
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th />
                            <Th>Name</Th>
                            <Th>Online</Th>
                            <Th>Email</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {registrations?.map((r) => (
                            <Tr key={r.profile.userId}>
                                <Td py={0}>
                                    <UserAvatar profile={r.profile} size="sm" />
                                </Td>
                                <Td>
                                    {r.profile.firstName +
                                        ' ' +
                                        r.profile.lastName}
                                    {r.profile.role != 'PARTICIPANT' && (
                                        <Tag size="sm" ml={2}>
                                            {r.profile.role}
                                        </Tag>
                                    )}
                                </Td>
                                <Td>{r.present ? <FaLaptop /> : undefined}</Td>
                                <Td>{r.contact_information.email}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
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
                    {isEditing && (
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
                    )}
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
