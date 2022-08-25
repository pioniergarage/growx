import GrowEventCard from '@/components/events/GrowEventCard';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useGrowEvents, useRegistrationsOfUser } from 'hooks/event';
import { useProfile } from 'hooks/profile';
import ConnectLayout from 'layouts/ConnectLayout';
import { NextPageWithLayout } from 'utils/types';

const EventsPage: NextPageWithLayout = () => {
    const { profile } = useProfile();

    const { events } = useGrowEvents();
    const { eventIds: registeredTo } = useRegistrationsOfUser(profile?.userId);

    return (
        <Box>
            <Heading mb={4}>Events</Heading>
            <VStack alignItems="stretch" gap={4}>
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
            </VStack>
        </Box>
    );
};

EventsPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default EventsPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
