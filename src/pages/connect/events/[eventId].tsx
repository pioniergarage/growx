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

type ExternalSignup = { href: string; label: string };

const GrowEvent = ({
    eventRaw,
    externalSignup,
}: {
    eventRaw: Database['public']['Tables']['events']['Row'] & {
        seats_left: number; //why is this always outdated?
    };
    externalSignup: ExternalSignup | null;
}) => {
    const event: GrowEventWithSeats = {
        ...mapEventDto(eventRaw),
        presenceSeatsLeft: eventRaw.seats_left ?? eventRaw.available_seats,
    };

    const user = useUser();
    const onSignUp = externalSignup
        ? () => window.location.assign(externalSignup.href)
        : undefined;
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
                    <EventRegistration
                        event={event}
                        onSignUp={onSignUp}
                        signUpLabel={externalSignup?.label}
                    />
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

        let externalSignup: ExternalSignup | null = null;
        if (eventRaw?.ref === 'midterm' && eventRaw.href) {
            try {
                const url = new URL(eventRaw.href);
                if (url.protocol === 'https:') {
                    const isLuma = ['luma.com', 'lu.ma'].includes(
                        url.hostname.replace(/^www\./, '')
                    );
                    externalSignup = {
                        href: url.href,
                        label: isLuma ? 'Sign up on Luma' : 'Sign up',
                    };
                }
            } catch {
                // An invalid external URL falls back to Connect signup.
            }
        }

        return { props: { eventRaw, externalSignup } };
    },
});
export default GrowEvent;
