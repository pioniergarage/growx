import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import GrowEventCard from 'modules/events/components/GrowEventCard';
import { useGrowEvents, useRegistrationsOfUser } from 'modules/events/hooks';
import { useProfile } from 'modules/profile/hooks';
import Link from 'next/link';

const EventsPage = () => {
    const { events } = useGrowEvents();
    const { profile } = useProfile();
    const { registrations } = useRegistrationsOfUser(profile?.userId);

    return (
        <Box>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
                mb={4}
            >
                <BreadcrumbItem isCurrentPage>
                    <Link href="/connect/events" passHref>
                        <BreadcrumbLink>Events</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <VStack alignItems="stretch" gap={2}>
                {registrations === undefined || events === undefined ? (
                    <>
                        <EventSkeleton />
                        <EventSkeleton />
                        <EventSkeleton />
                    </>
                ) : (
                    events.map((event) => (
                        <GrowEventCard
                            key={event.id}
                            event={event}
                            registration={registrations?.find(
                                (registration) =>
                                    registration.eventId === event.id
                            )}
                        />
                    ))
                )}
            </VStack>
        </Box>
    );
};

const EventSkeleton = () => {
    return <Skeleton h={{ base: '8rem', lg: '5rem' }} borderRadius={8} />;
};

export default EventsPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
