import EventTagList from '@/components/events/EventTagList';
import { Heading, Text, VStack } from '@chakra-ui/react';
import {
    supabaseServerClient,
    withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import { mapEventDto } from 'database/events';
import { definitions } from 'database/supabase';

const GrowEvent = ({ eventRaw }: { eventRaw: definitions['events'] }) => {
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
    getServerSideProps: async (context) => {
        const { data: eventRaw, error } = await supabaseServerClient(context)
            .from<definitions['events']>('events')
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
