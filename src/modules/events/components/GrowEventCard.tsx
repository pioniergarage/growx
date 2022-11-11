import Card from '@/components/Card';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Collapse,
    Flex,
    Grid,
    GridItem,
    Heading,
    Hide,
    IconButton,
    Show,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';

import {
    useRegisterUserToEvent,
    useUnregisterUserFromEvent,
} from 'modules/events/hooks';
import { useProfile } from 'modules/profile/hooks';
import { useMemo } from 'react';
import { EventType, GrowEvent } from '../types';
import EventTagList from './EventTagList';
import SignUpDialog from './SignUpDialog';

export type GrowEventCardProps = {
    event: GrowEvent;
    registration?: { present: boolean };
};

const GrowEventCard: React.FC<GrowEventCardProps> = ({
    event,
    registration,
}) => {
    const { isOpen: isExpanded, onToggle: toggleExpanded } = useDisclosure();

    const { registerUser, isLoading: isRegistering } = useRegisterUserToEvent();
    const { unregisterUser, isLoading: isUnregistering } =
        useUnregisterUserFromEvent();
    const user = useUser();
    const { profile } = useProfile();
    const toast = useToast();

    const over = useMemo(() => new Date() > event.date, [event.date]);

    async function register(present: boolean) {
        if (!user) return;
        try {
            await registerUser({ user, event, present });
            toast({
                title: 'Registered to ' + event.title,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    async function deregister() {
        if (!user) return;
        try {
            await unregisterUser({ user, event });
            toast({
                title: 'Unregistered from ' + event.title,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    return (
        <Card
            as={Grid}
            alignItems="center"
            gridTemplateColumns={{ base: '1fr 2fr', md: '10rem 2fr' }}
            px={3}
            pt={4}
            pb={3}
            columnGap={{ base: 2, md: 4 }}
        >
            <GridItem rowSpan={{ base: undefined, md: 3 }}>
                <Heading
                    lineHeight={1}
                    textAlign="center"
                    textTransform="uppercase"
                    fontSize="2xl"
                    color={over ? 'gray.500' : undefined}
                >
                    <Text as="span" fontSize="sm">
                        {event.date.toLocaleString('en-US', {
                            weekday: 'short',
                        })}
                    </Text>
                    <br />
                    {event.date.toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'short',
                    })}
                </Heading>
            </GridItem>
            <Box>
                <Heading size={{ base: 'xs', sm: 'md' }}>{event.title}</Heading>
                <EventTagList
                    event={event}
                    isSQTagVisible={profile?.keyQualification}
                    registration={over ? undefined : registration}
                    transparent
                    gap={0}
                />
            </Box>
            <Show below="md">
                {!over && (
                    <>
                        <GridItem colSpan={2}>
                            <Collapse in={isExpanded}>
                                <Flex py={2} flexDir="column">
                                    <Text variant="info" fontSize="sm">
                                        {event.description}
                                    </Text>
                                    {!over && (
                                        <EventRegistration
                                            registration={registration}
                                            onDeregister={deregister}
                                            isLoading={
                                                isRegistering || isUnregistering
                                            }
                                            eventType={
                                                event.type || EventType.Online
                                            }
                                            onRegister={register}
                                        />
                                    )}
                                </Flex>
                            </Collapse>
                        </GridItem>
                        <GridItem colSpan={2} mt={2}>
                            <IconButton
                                aria-label="expand"
                                variant="ghost"
                                w="100%"
                                size="xs"
                                icon={
                                    isExpanded ? (
                                        <ChevronUpIcon />
                                    ) : (
                                        <ChevronDownIcon />
                                    )
                                }
                                onClick={toggleExpanded}
                            />
                        </GridItem>
                    </>
                )}
            </Show>
            <Hide below="md">
                <GridItem colStart={2}>
                    <Flex pt={2} flexDir="column">
                        <Text variant="info" fontSize="sm">
                            {event.description}
                        </Text>
                        {!over && (
                            <EventRegistration
                                registration={registration}
                                onDeregister={deregister}
                                isLoading={isRegistering || isUnregistering}
                                eventType={event.type || EventType.Online}
                                onRegister={register}
                            />
                        )}
                    </Flex>
                </GridItem>
            </Hide>
        </Card>
    );
};

type EventRegistrationProps = {
    registration: GrowEventCardProps['registration'];
    onDeregister: () => void;
    onRegister: (present: boolean) => void;
    isLoading: boolean;
    eventType: EventType;
};
const EventRegistration = ({
    registration,
    onDeregister,
    eventType,
    isLoading,
    onRegister,
}: EventRegistrationProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleRegisterClick = () => {
        if (eventType === EventType.Hybrid) {
            onOpen();
        } else {
            onRegister(eventType === EventType.Offline);
        }
    };

    if (registration) {
        return (
            <Alert
                status={registration ? 'success' : 'info'}
                mt={2}
                py={2}
                pr={2}
                backgroundColor="transparent"
                border="1px"
                borderColor="gray.700"
                borderRadius={4}
            >
                <AlertIcon />
                {registration && (
                    <>
                        You have signed up (
                        {registration.present ? 'in person' : 'online'})
                    </>
                )}
                <Button
                    onClick={onDeregister}
                    size="sm"
                    isLoading={isLoading}
                    variant="solid"
                    ml="auto"
                >
                    Deregister
                </Button>
            </Alert>
        );
    } else {
        return (
            <>
                <Button
                    variant="solid"
                    mt={2}
                    maxW={{ md: '20rem' }}
                    size="sm"
                    isLoading={isLoading}
                    onClick={handleRegisterClick}
                >
                    Register
                </Button>
                {eventType === EventType.Hybrid && (
                    <SignUpDialog
                        isOpen={isOpen}
                        onSubmit={(present) => {
                            onClose();
                            onRegister(present);
                        }}
                        onCancel={onClose}
                    />
                )}
            </>
        );
    }
};

export default GrowEventCard;
