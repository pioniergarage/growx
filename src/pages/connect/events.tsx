import ConnectLayout from 'layouts/ConnectLayout';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { useProfile } from 'hooks/profile';
import { useEffect, useState } from 'react';
import GrowEventCard from '@/components/events/GrowEventCard';
import { GrowEvent } from 'model';
import { NextPageWithLayout } from 'utils/types';
import { getEvents, getRegistrationsOfUser } from 'api/events';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const EventsPage: NextPageWithLayout = () => {
    const { profile } = useProfile();

    const [events, setEvents] = useState<GrowEvent[]>([]);
    const [registeredTo, setRegisteredTo] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            if (!profile) return;
            const { data } = await getEvents();
            const { data: registered } = await getRegistrationsOfUser(
                profile.userId
            );
            if (registered) {
                setRegisteredTo(registered.map((r) => r.eventId));
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
