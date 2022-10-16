import { Heading, Text, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';
import { mapEventDto } from 'modules/events/api';
import EventTagList from 'modules/events/components/EventTagList';

const GrowEvent = ({
    eventRaw,
}: {
    eventRaw: Database['public']['Tables']['events']['Row'];
}) => {
    const event = mapEventDto(eventRaw);
    return (
        <VStack alignItems="start">
            <Heading size="lg">{event.title}</Heading>
            <EventTagList event={event} />
            <Text>{eventRaw.description}</Text>
        </VStack>
    );
};
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context, supabase) => {
        const { data: eventRaw, error } = await supabase
            .from('events')
            .select('*')
            .match({ id: context.query.eventId })
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return { props: { eventRaw } };
    },
});
export default GrowEvent;
