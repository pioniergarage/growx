import { ChevronRightIcon, QuestionIcon } from '@chakra-ui/icons';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Center,
    Flex,
    Skeleton,
    SkeletonText,
    VStack,
} from '@chakra-ui/react';
import { useGrowEvents, useRegistrationsOfUser } from 'hooks/event';
import { useProfile } from 'hooks/profile';
import { EventType, GrowEvent } from 'model';
import { useMemo } from 'react';
import {
    FaBuilding,
    FaCalendarAlt,
    FaChromecast,
    FaCloud,
    FaExclamation,
    FaMapMarkerAlt,
} from 'react-icons/fa';

const EventsPage = () => {
    const { profile } = useProfile();
    const { registrations } = useRegistrationsOfUser(profile?.userId);
    const { events } = useGrowEvents();

    return (
        <Box>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
                mb={4}
            >
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Events</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            {registrations === undefined || events === undefined ? (
                <VStack alignItems="stretch" gap={10}>
                    <EventSkeleton />
                    <EventSkeleton />
                    <EventSkeleton />
                </VStack>
            ) : (
                <Box>
                    <Flex mb={2} px={4} pr={12} color="gray.400" gap={4}>
                        <Flex w="8.5rem" alignItems="center">
                            <FaCalendarAlt />
                        </Flex>
                        <Box flexGrow="1">Title</Box>
                        <Box w="6rem">Mandatory</Box>
                        <Flex w="10rem" alignItems="center">
                            <FaMapMarkerAlt />
                        </Flex>
                        <Flex pr={1} alignItems="center">
                            <QuestionIcon />
                        </Flex>
                    </Flex>
                    <Accordion allowToggle>
                        {events.map((event) => (
                            <EventRow key={event.id} event={event} />
                        ))}
                    </Accordion>
                </Box>
            )}
        </Box>
    );
};

const EventRow = ({ event }: { event: GrowEvent }) => {
    const { day, month, time, over } = useMemo(() => {
        const day = String(event.date.getDate()).padStart(2, '0');
        const month = event.date.toLocaleString('en-US', { month: 'short' });
        const time = event.date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        const over = new Date() > event.date;
        return { day, month, time, over };
    }, [event.date]);
    return (
        <AccordionItem key={event.id}>
            <h2>
                <AccordionButton
                    gap={4}
                    _expanded={{ bg: 'whiteAlpha.50' }}
                    _hover={{ bg: 'whiteAlpha.100' }}
                    color="gray.400"
                >
                    <Box w="8.5rem" textAlign="left" color="primary">
                        {month} {day}, {time}
                    </Box>
                    <Box
                        fontWeight="600"
                        flexGrow="1"
                        textAlign="left"
                        color={over ? 'gray.500' : 'white'}
                    >
                        {event.title}
                    </Box>
                    {event.mandatory ? (
                        <Center w="6rem">
                            <FaExclamation />
                        </Center>
                    ) : undefined}
                    {event.location ? (
                        <Box
                            w="10rem"
                            textAlign="left"
                            fontSize="sm"
                            fontWeight="semibold"
                        >
                            {event.location}
                        </Box>
                    ) : undefined}
                    {event.type === EventType.Hybrid ? (
                        <FaChromecast />
                    ) : event.type === EventType.Online ? (
                        <FaCloud />
                    ) : event.type === EventType.Offline ? (
                        <FaBuilding />
                    ) : undefined}
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel>{event.description}</AccordionPanel>
        </AccordionItem>
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
