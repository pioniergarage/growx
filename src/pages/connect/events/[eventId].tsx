import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from 'utils/supabase/withPageAuth';

import { useUser } from '@/components/providers/SupabaseProvider';
import { Database } from 'database/DatabaseDefition';
import { mapEventDto } from 'modules/events/api';
import EventInformationCard from 'modules/events/components/EventInformationCard';
import EventRegistration from 'modules/events/components/EventRegistration';
import { GrowEventWithSeats } from 'modules/events/types';
import Link from 'next/link';

const GrowEvent = ({
    eventRaw,
}: {
    eventRaw: Database['public']['Tables']['events']['Row'] & {
        seats_left: number; //why is this always outdated?
    };
}) => {
    const event: GrowEventWithSeats = {
        ...mapEventDto(eventRaw),
        presenceSeatsLeft: eventRaw.seats_left ?? eventRaw.available_seats,
    };

    const user = useUser();
    return (
        <VStack alignItems="stretch" gap={2}>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem>
                    <Link href="/events" passHref legacyBehavior>
                        <BreadcrumbLink>Events</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <Link href={'/connect/events/' + event.id} passHref legacyBehavior>
                        <BreadcrumbLink>
                            <Text
                                as="span"
                                display="block"
                                maxW={60}
                                textOverflow="ellipsis"
                                overflow="hidden"
                                whiteSpace="nowrap"
                            >
                                {event.title}
                            </Text>
                        </BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Heading size="md">{event.title}</Heading>
            <Flex flexDir={{ base: 'column', md: 'row' }} gap={4}>
                <Text variant="info" fontSize={{ base: 'sm', md: 'md' }}>
                    {eventRaw.description}
                </Text>
                <Flex flexDir="column" gap={4} minW={{ md: '25rem' }}>
                    <EventInformationCard event={event} auth={user != null} />
                    <EventRegistration event={event} />
                </Flex>
            </Flex>
        </VStack>
    );
};
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context, supabase) => {
        const eventIdParam = Array.isArray(context.query.eventId)
            ? context.query.eventId[0]
            : context.query.eventId;

        if (!eventIdParam || !/^\d+$/.test(eventIdParam)) {
            return { notFound: true };
        }

        const eventId = Number(eventIdParam);

        const { data: eventRaw, error } = await supabase
            .from('event_with_seats')
            .select('*')
            .eq('id', eventId)
            .single();

        if (error) throw new Error(error.message);
        return { props: { eventRaw } };
    },
});
export default GrowEvent;
