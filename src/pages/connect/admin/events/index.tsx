import AdminBreadcrumbs, { AdminBreadcrumbItem } from '@/components/navigation/AdminBreadcrumbs';
import PageLink from '@/components/navigation/PageLink';
import { CheckIcon } from '@chakra-ui/icons';
import {
    Button,
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

import CreateEventModal from 'modules/events/components/CreateEventModal';
import { useGrowEvents, useInsertEvent } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import { useState } from 'react';

export default function EventManagement() {
    const { events } = useGrowEvents();
    const { insertEvent } = useInsertEvent();
    const [modalOpen, setModalOpen] = useState(false);

    async function createEvent(event: Omit<GrowEvent, 'id'>) {
        await insertEvent(event);
        setModalOpen(false);
    }

    return (
        <VStack alignItems="start">
        <AdminBreadcrumbs>
            <AdminBreadcrumbItem href="/connect/admin/events">
                Events
            </AdminBreadcrumbItem>
        </AdminBreadcrumbs>

            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Title</Th>
                            <Th>Location</Th>
                            <Th>Type</Th>
                            <Th>Mandatory</Th>
                            <Th>SQ-Mandatory</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {events &&
                            events.map((event) => (
                                <Tr key={event.id}>
                                    <Td>{event.date.toLocaleString()}</Td>
                                    <Td>
                                        <PageLink
                                            color="primary"
                                            href={
                                                '/connect/admin/events/' +
                                                event.id
                                            }
                                        >
                                            {event.title}
                                        </PageLink>
                                    </Td>
                                    <Td>{event.location}</Td>
                                    <Td>{event.type}</Td>
                                    <Td>
                                        <CheckIcon
                                            visibility={
                                                event.mandatory
                                                    ? 'visible'
                                                    : 'hidden'
                                            }
                                        />
                                    </Td>
                                    <Td>
                                        <CheckIcon
                                            visibility={
                                                event.sq_mandatory
                                                    ? 'visible'
                                                    : 'hidden'
                                            }
                                        />
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <CreateEventModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreate={(event) => createEvent(event)}
            />

            <Button onClick={() => setModalOpen(true)}>New Event</Button>
        </VStack>
    );
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
