import FullTable from '@/components/FullTable';
import ConnectLayout from '@/components/layouts/ConnectLayout';
import {
    Heading,
    Text,
    useToast,
    VStack,
    LinkBox,
    LinkOverlay,
    Button,
} from '@chakra-ui/react';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GrowEvent, GrowEventDto, NextPageWithLayout, ProfileDto } from 'types';

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
            <VStack alignItems="start">
                {events.map((event) => (
                    <LinkBox key={event.id} p={2} borderWidth={1} fontSize="sm">
                        <Text>{event.date.toDateString()}</Text>
                        <Heading size="sm">
                            <LinkOverlay
                                href={`/connect/admin/events/${event.id}`}
                            >
                                {event.title}
                            </LinkOverlay>
                        </Heading>
                        <Text>{event.description}</Text>
                    </LinkBox>
                ))}
            </VStack>
            <Button onClick={createNewEvent}>New Event</Button>
        </VStack>
    );
}

const AdminPage: NextPageWithLayout = () => {
    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4}>
            <Heading>Admin</Heading>
            <Profiles />
            <Events />
        </VStack>
    );
};

AdminPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default AdminPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
