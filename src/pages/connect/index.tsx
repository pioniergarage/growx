import GrowEventCard from '@/components/events/GrowEventCard';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import {
    getUser,
    supabaseServerClient,
    withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import { definitions } from 'database/supabase';
import { useGrowEvents } from 'hooks/event';
import { useMemo } from 'react';

interface ConnectIndexProps {
    profile: definitions['profiles'];
}

const ConnectIndex: React.FC<ConnectIndexProps> = ({ profile }) => {
    const { events } = useGrowEvents();
    const upcomingEvents = useMemo(() => {
        if (events) {
            const now = new Date();
            return events
                .filter((e) => e.date > now)
                .slice(0, Math.min(events.length, 2));
        } else {
            return [];
        }
    }, [events]);

    return (
        <Flex wrap="wrap">
            <VStack flexGrow={1} alignItems="start" gap={4}>
                <Heading size="md">
                    <Text as="span" color="gray.400">
                        Welcome back,
                    </Text>{' '}
                    {profile.first_name}
                </Heading>
                {upcomingEvents.length > 0 ? (
                    <Box>
                        <Heading
                            mb={2}
                            size="sm"
                            color="gray.400"
                            fontSize={12}
                        >
                            Upcoming Events
                        </Heading>
                        <VStack gap={8}>
                            {upcomingEvents.map((event) => (
                                <GrowEventCard key={event.id} event={event} />
                            ))}
                        </VStack>
                    </Box>
                ) : undefined}

            </VStack>
        </Flex>
    );
};

export default ConnectIndex;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context) => {
        const client = supabaseServerClient(context);
        const { user } = await getUser(context);
        const { data: profile, error } = await client
            .from<definitions['profiles']>('profiles')
            .select('*')
            .match({ user_id: user.id })
            .single();
        if (error) {
            throw new Error(error.message);
        }

        return { props: { profile } };
    },
});
