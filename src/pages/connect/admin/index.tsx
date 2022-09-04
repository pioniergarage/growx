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
import { useCreateEvent, useGrowEvents } from 'hooks/event';
import { useProfiles } from 'hooks/profile';
import ConnectLayout from 'layouts/ConnectLayout';
import { useRouter } from 'next/router';
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
                                      <Td>
                                          <IconButton
                                              aria-label="Adjust sponsor"
                                              icon={<FaPen />}
                                              variant="ghost"
                                              size="xs"
                                              onClick={() => adjustEvent(event)}
                                          />
                                      </Td>
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

AdminPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default AdminPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
