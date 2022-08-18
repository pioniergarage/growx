import FullTable from '@/components/FullTable';
import ConnectLayout from 'layouts/ConnectLayout';
import {
    Heading,
    useToast,
    VStack,
    Button,
    TableContainer,
    Link,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Divider,
} from '@chakra-ui/react';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GrowEvent, GrowEventDto, NextPageWithLayout, ProfileDto } from 'types';
import PartnerAdmin from '@/components/partners/PartnerAdmin';

function Profiles() {
    const toast = useToast();
    const [profiles, setProfiles] = useState<ProfileDto[]>([]);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabaseClient
                .from<ProfileDto>('profiles')
                .select('*');
            if (error) {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
            if (data) {
                setProfiles(data);
            }
        })();
    }, [toast]);
    return <FullTable values={profiles} idProp="user_id" heading="Profiles" />;
}

function Events() {
    const router = useRouter();
    const toast = useToast();
    const [events, setEvents] = useState<GrowEvent[]>([]);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabaseClient
                .from<GrowEventDto>('events')
                .select('*')
                .order('date');
            if (error) {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
            if (data) {
                setEvents(data.map((e) => ({ ...e, date: new Date(e.date) })));
            }
        })();
    }, [toast]);

    async function createNewEvent() {
        const { error, data } = await supabaseClient
            .from<GrowEvent>('events')
            .insert({ title: 'New Event' })
            .single();
        if (error) {
            toast({
                title: error.message,
                status: 'error',
            });
        } else if (data) {
            router.push('/connect/admin/events/' + data.id);
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
                        {events.map((event) => (
                            <Tr key={event.id}>
                                <Td>{event.date.toISOString()}</Td>
                                <Td><Link href={'/connect/admin/events/'+event.id}>{event.title}</Link></Td>
                            </Tr>
                        ))}
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
