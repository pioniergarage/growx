import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import EventModal from '@/components/events/EventModal';
import {
    Button,
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
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useGrowEvents, useInsertEvent, useDeleteEvent, useUpdateEvent } from 'hooks/event';
import { GrowEvent, EventType } from 'model';
import { useState } from 'react';
import { FaPen } from 'react-icons/fa';


export default function EventManagement() {
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

    function undefinedBooleanToString(b: boolean | undefined) {
        if (b != undefined) {
            return b.toString();
        } else {
            return '';
        }
    }

    return (
        <VStack alignItems="start">
            <AdminBreadcrumbs route={[['Events', '/connect/admin/events']]} />
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
                            <Th>Description</Th>
                            <Th>Location</Th>
                            <Th>Type</Th>
                            <Th>Mandatory</Th>
                            <Th>SQ-Mandatory</Th>
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
                                      <Td>{event.description}</Td>
                                      <Td>{event.location}</Td>
                                      <Td>{event.type}</Td>
                                      <Td>
                                          {undefinedBooleanToString(
                                              event.mandatory
                                          )}
                                      </Td>
                                      <Td>
                                          {undefinedBooleanToString(
                                              event.sq_mandatory
                                          )}
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

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
