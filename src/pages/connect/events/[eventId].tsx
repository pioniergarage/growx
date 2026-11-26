import MarkdownText from '@/components/MarkdownText';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from 'utils/supabase/withPageAuth';

import { Database } from 'database/DatabaseDefition';
import { mapEventDto } from 'modules/events/api';
import EventInformationCard from 'modules/events/components/EventInformationCard';
import EventRegistration from 'modules/events/components/EventRegistration';
import { GrowEventWithSeats } from 'modules/events/types';
import { getEventExternalUrl } from 'modules/events/utils';
import Link from 'next/link';

type EventDetailProps = {
    eventData: Omit<GrowEventWithSeats, 'date' | 'videoUrl'> & { date: string };
    signedIn: boolean;
};

const GrowEvent = ({ eventData, signedIn }: EventDetailProps) => {
    const event: GrowEventWithSeats = {
        ...eventData,
        date: new Date(eventData.date),
    };
    const isMidterm = event.ref === 'midterm';

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
                <MarkdownText
                    color="#bac5d4"
                    fontSize={{ base: 'sm', md: 'md' }}
                >
                    {event.description}
                </MarkdownText>
                <Flex flexDir="column" gap={4} minW={{ md: '25rem' }}>
                    <EventInformationCard event={event} auth={signedIn} />
                    {!isMidterm && event.href && (
                        <Button as="a" href={event.href} alignSelf="center">
                            Link to Event
                        </Button>
                    )}
                    {(isMidterm || signedIn) && (
                        <EventRegistration
                            event={event}
                            midtermSignupUrl={event.href}
                        />
                    )}
                </Flex>
            </Flex>
        </VStack>
    );
};
export const getServerSideProps = withPageAuth<EventDetailProps>({
    authRequired: false,
    getServerSideProps: async (context, supabase, user) => {
        const eventIdParam = Array.isArray(context.query.eventId)
            ? context.query.eventId[0]
            : context.query.eventId;

        if (!eventIdParam || !/^\d+$/.test(eventIdParam)) {
            return { notFound: true };
        }

        const eventId = Number(eventIdParam);

        const { data: eventRaw, error } = user
            ? await supabase.from('event_with_seats').select('*').eq('id', eventId).maybeSingle()
            : await supabase.from('events').select('*').eq('id', eventId).maybeSingle();

        if (error) throw new Error(error.message);
        if (!eventRaw) return { notFound: true };

        const externalUrl = getEventExternalUrl(eventRaw);
        if (!user && !externalUrl) {
            return { redirect: { destination: '/connect/login', permanent: false } };
        }

        const event = mapEventDto(
            eventRaw as Database['public']['Tables']['events']['Row']
        );
        return {
            props: {
                eventData: {
                    id: event.id,
                    ref: event.ref,
                    title: event.title,
                    description: event.description,
                    date: event.date.toISOString(),
                    duration: event.duration,
                    location: event.location,
                    mandatory: event.mandatory,
                    type: event.type,
                    eventCategory: event.eventCategory,
                    href: externalUrl,
                    availableSeats: user ? event.availableSeats : 0,
                    presenceSeatsLeft: user && 'seats_left' in eventRaw
                        ? eventRaw.seats_left ?? event.availableSeats
                        : 0,
                },
                signedIn: !!user,
            },
        };
    },
});
export default GrowEvent;
