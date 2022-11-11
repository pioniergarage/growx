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
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
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
        seats_left: number;
    };
}) => {
    const event: GrowEventWithSeats = {
        ...mapEventDto(eventRaw),
        presenceSeatsLeft: eventRaw.seats_left,
    };
    return (
        <VStack alignItems="stretch" gap={2}>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem>
                    <Link href="/connect/events" passHref>
                        <BreadcrumbLink>Events</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <Link href={'/connect/events/' + event.id} passHref>
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
                <Text variant="info" fontSize="sm">
                    {eventRaw.description}
                </Text>
                <Flex flexDir="column" gap={4} minW={{ md: '25rem' }}>
                    <EventInformationCard event={event} />
                    <EventRegistration event={event} />
                </Flex>
            </Flex>
        </VStack>
    );
};
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context, supabase) => {
        const { data: eventRaw, error } = await supabase
            .from('event_with_seats')
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
