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
import EventTagList from 'modules/events/components/EventTagList';
import Link from 'next/link';

const GrowEvent = ({
    eventRaw,
}: {
    eventRaw: Database['public']['Tables']['events']['Row'];
}) => {
    const event = mapEventDto(eventRaw);
    return (
        <VStack alignItems="start">
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
                mb={4}
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
            <Heading size="sm" color="secondary">
                {event.date.toLocaleString('de-DE')}
            </Heading>
            <Heading size="md">{event.title}</Heading>
            <Flex gap={4}>
                <Text variant="info">{eventRaw.description}</Text>
                <EventTagList event={event} transparent minW="7rem" />
            </Flex>
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
