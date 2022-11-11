import Card from '@/components/Card';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Grid,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { Database } from 'database/DatabaseDefition';
import { mapEventDto } from 'modules/events/api';
import { useRegistrationsOfUser } from 'modules/events/hooks';
import { formatEventTime } from 'modules/events/utils';
import Link from 'next/link';
import { useMemo } from 'react';
import {
    FaCalendar,
    FaChromecast,
    FaClock,
    FaMapMarkerAlt,
    FaTicketAlt,
} from 'react-icons/fa';

const GrowEvent = ({
    eventRaw,
}: {
    eventRaw: Database['public']['Tables']['events']['Row'];
}) => {
    const event = mapEventDto(eventRaw);
    const user = useUser();

    const { registrations } = useRegistrationsOfUser(user?.id);
    const registration = useMemo(
        () => (registrations ?? []).find((r) => r.eventId == event.id),
        [event.id, registrations]
    );
    const eventTimeFormatted = useMemo(
        () => formatEventTime(event.date, event.duration),
        [event.date, event.duration]
    );
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
            <Text variant="info" fontSize="sm">
                {eventRaw.description}
            </Text>
            <Card p={4}>
                <Grid templateColumns="1.5rem 2fr auto" alignItems="center">
                    <FaCalendar />
                    <Text as="div" variant="info" fontWeight="light">
                        Date
                    </Text>
                    <Box fontWeight="bold" textAlign="right">
                        {event.date.toLocaleString('de-DE', {
                            day: '2-digit',
                            month: 'long',
                        })}
                    </Box>
                    <FaClock />
                    <Text as="div" variant="info" fontWeight="light">
                        Time
                    </Text>
                    <Box fontWeight="bold" textAlign="right">
                        {eventTimeFormatted}
                    </Box>
                    <FaMapMarkerAlt />
                    <Text as="div" variant="info" fontWeight="light">
                        Location
                    </Text>
                    <Box fontWeight="bold" textAlign="right">
                        {event.location}
                    </Box>
                    <FaChromecast />
                    <Text as="div" variant="info" fontWeight="light">
                        Seats online left
                    </Text>
                    <Box fontWeight="bold" textAlign="right">
                        ∞
                    </Box>
                    <FaTicketAlt />
                    <Text as="div" variant="info" fontWeight="light">
                        Seats in presence left
                    </Text>
                    <Box fontWeight="bold" textAlign="right">
                        23
                    </Box>
                </Grid>
            </Card>
            <Button>Sign up</Button>
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
