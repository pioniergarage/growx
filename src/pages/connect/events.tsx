import ConnectLayout from 'layouts/ConnectLayout';
import {
    Box,
    Heading,
    VStack,
} from '@chakra-ui/react';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfile } from 'hooks/profile';
import { useEffect, useState } from 'react';
import { GrowEvent, GrowEventDto, NextPageWithLayout } from 'types';
import GrowEventCard from '@/components/events/GrowEventCard';


const EventsPage: NextPageWithLayout = () => {
    const { profile } = useProfile();

    const [events, setEvents] = useState<GrowEvent[]>([]);
    const [registeredTo, setRegisteredTo] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            if (!profile) return;
            const { data } = await supabaseClient
                .from<GrowEventDto>('events')
                .select('*')
                .order('date');
            const { data: registered } = await supabaseClient
                .from<{ user_id: string; event_id: number }>('registrations')
                .select('event_id')
                .match({ user_id: profile?.user_id });
            if (registered) {
                setRegisteredTo(registered.map((r) => r.event_id));
            }
            if (data) {
                setEvents(data.map((e) => ({ ...e, date: new Date(e.date) })));
            }
        })();
    }, [profile]);

    return (
        <Box>
            <Heading mb={4}>Events</Heading>
            <VStack alignItems="stretch" gap={4}>
                {events.map((event) => (
                    <GrowEventCard
                        key={event.id}
                        event={event}
                        registered={registeredTo.includes(event.id)}
                    />
                ))}
            </VStack>
        </Box>
    );
};

EventsPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default EventsPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
