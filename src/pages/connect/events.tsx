import GrowEventCard from '@/components/events/GrowEventCard';
import { Box, Heading, VStack } from '@chakra-ui/react';
import {
    supabaseServerClient,
    withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import { mapEventDto } from 'api/events';
import { definitions } from 'api/supabase';
import { useRegistrationsOfUser } from 'hooks/event';
import { useProfile } from 'hooks/profile';

const EventsPage = ({ eventsRaw }: { eventsRaw: definitions['events'][] }) => {
    const { profile } = useProfile();
    const { eventIds: registeredTo } = useRegistrationsOfUser(profile?.userId);
    const events = eventsRaw.map(mapEventDto);

    return (
        <Box>
<<<<<<< HEAD
            <Heading mb={10}>Events</Heading>
            <VStack alignItems="stretch" gap={10}>
                {events
                    ? events.map((event) => (
                          <GrowEventCard
                              key={event.id}
                              event={event}
                              registered={(registeredTo || []).includes(
                                  event.id
                              )}
                          />
                      ))
                    : undefined}
=======
            <Heading mb={4}>Events</Heading>
            <VStack alignItems="stretch" gap={4}>
                {events.map((event) => (
                    <GrowEventCard
                        key={event.id}
                        event={event}
                        registered={(registeredTo || []).includes(event.id)}
                    />
                ))}
>>>>>>> main
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
