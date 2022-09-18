import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import {
    Button,
    Heading,
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
import { useCreateEvent, useGrowEvents } from 'hooks/event';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Events() {
    const router = useRouter();
    const toast = useToast();
    const { events } = useGrowEvents();
    const { createEvent } = useCreateEvent();

    async function createNewEvent() {
        try {
            const result = await createEvent({ title: 'New Event' });
            router.push('/connect/admin/events/' + result.id);
        } catch (error) {
            toast({
                title: 'Could not create event',
                status: 'error',
            });
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
                            <Th>Date</Th>
                            <Th>Title</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {events
                            ? events.map((event) => (
                                  <Tr key={event.id}>
                                      <Td>{event.date.toISOString()}</Td>
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
            <Button onClick={createNewEvent}>New Event</Button>
        </VStack>
    );
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
