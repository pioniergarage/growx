import GrowEventCard from '@/components/events/GrowEventCard';
import { Box, Heading, VStack } from '@chakra-ui/react';
import {
    supabaseServerClient,
    withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import { mapEventDto } from 'database/events';
import { definitions } from 'database/supabase';
import { useRegistrationsOfUser } from 'hooks/event';
import { useProfile } from 'hooks/profile';

const EventsPage = ({ eventsRaw }: { eventsRaw: definitions['events'][] }) => {
    const { profile } = useProfile();
    const { registrations } = useRegistrationsOfUser(profile?.userId);
    const events = eventsRaw.map(mapEventDto);

    return (
        <Box>
            <Heading mb={6}>Events</Heading>
            <VStack alignItems="stretch" gap={10}>
                {events.map((event) => (
                    <GrowEventCard
                        key={event.id}
                        event={event}
                        registration={registrations?.find(
                            (registration) => registration.eventId === event.id
                        )}
                    />
                ))}
            </VStack>
        </Box>
    );
};

export default EventsPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context) => {
        const { data, error } = await supabaseServerClient(context)
            .from<definitions['events']>('events')
            .select('*')
            .order('date');
        if (error) {
            throw new Error(error.message);
        }
        return { props: { eventsRaw: data } };
    },
});
