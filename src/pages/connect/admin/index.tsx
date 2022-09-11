import EventModal from '@/components/events/EventModal';
import FullTable from '@/components/FullTable';
import PartnerAdmin from '@/components/partners/PartnerAdmin';
import {
    Button,
    Divider,
    Heading,
    IconButton,
    Link,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import {
    useDeleteEvent,
    useGrowEvents,
    useInsertEvent,
    useUpdateEvent,
} from 'hooks/event';
import { useProfiles } from 'hooks/profile';
import { EventType, GrowEvent } from 'model';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { NextPageWithLayout } from 'utils/types';

function Profiles() {
    const { profiles, isLoading } = useProfiles();

    return (
        <FullTable
            loading={isLoading}
            values={profiles || []}
            idProp="userId"
            heading="Profiles"
        />
    );
}

function Events() {
    const router = useRouter();
    const toast = useToast();
    const { events } = useGrowEvents();
    const { insertEvent } = useInsertEvent();
    const { deleteEvent } = useDeleteEvent();
    const { updateEvent } = useUpdateEvent();
    const [modalOpen, setModalOpen] = useState(false);

    const [eventOnEdit, setEventOnEdit] = useState<
        Omit<GrowEvent, 'id'> & { id?: number }
    >({
        id: undefined,
        date: Date.prototype,
        title: '',
        description: '',
        location: '',
        mandatory: false,
        sq_mandatory: false,
        type: EventType.Hybrid,
    });

    function setNewEventModal() {
        setEventOnEdit({
            title: '',
            description: undefined,
            mandatory: undefined,
            location: '',
            date: new Date(),
        });
        setModalOpen(true);
    }

    function adjustEvent(event: GrowEvent) {
        setEventOnEdit(event);
        setModalOpen(true);
    }

    async function onDeleteEvent() {
        if (eventOnEdit.id) {
            deleteEvent(eventOnEdit.id);
        }
        setModalOpen(false);
    }

    async function saveEvent(event: GrowEvent) {
        await updateEvent(event);
        setModalOpen(false);
    }

    async function createEvent(event: GrowEvent) {
        await insertEvent(event);
        setModalOpen(false);
    }

    return (
        <VStack alignItems="start">
            <Heading size="md" as="h3">
                Events
            </Heading>

            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Date</Th>
                            <Th>Title</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {events
                            ? events.map((event) => (
                                  <Tr key={event.id}>
                                      <Td>
                                          <IconButton
                                              aria-label="Adjust Event"
                                              icon={<FaPen />}
                                              variant="ghost"
                                              size="xs"
                                              onClick={() => adjustEvent(event)}
                                          />
                                      </Td>
                                      <Td>{event.date.toLocaleString()}</Td>
                                      <Td>
                                          <Link
                                              href={
                                                  '/connect/admin/events/' +
                                                  event.id
                                              }
                                          >
                                              {event.title}
                                          </Link>
                                      </Td>
                                  </Tr>
                              ))
                            : undefined}
                    </Tbody>
                </Table>
            </TableContainer>

            <EventModal
                isOpen={modalOpen}
                initialValue={eventOnEdit}
                onClose={() => setModalOpen(false)}
                onSave={(event) => saveEvent(event as GrowEvent)}
                onDelete={onDeleteEvent}
                onCreate={(event) => createEvent(event as GrowEvent)}
            />

            <Button onClick={setNewEventModal}>New Event</Button>
        </VStack>
    );
}

const AdminPage: NextPageWithLayout = () => {
    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4} mb={4}>
            <Heading>Admin</Heading>
            <Profiles />
            <Divider />
            <Events />
            <Divider />
            <PartnerAdmin />
        </VStack>
    );
};

export default AdminPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
