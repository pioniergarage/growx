import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Skeleton,
    SkeletonText,
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
            <VStack alignItems="stretch" gap={10}>
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
    return (
        <VStack alignItems="stretch">
            <Skeleton maxW="10rem" h="2rem" />
            <SkeletonText noOfLines={4} />
            <Flex gap={2}>
                <Skeleton h="1rem" w="3rem" />
                <Skeleton h="1rem" w="4.2rem" />
            </Flex>
        </VStack>
    );
};

export default EventsPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
