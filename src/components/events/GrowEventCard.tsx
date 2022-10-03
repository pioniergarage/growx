import {
    Button,
    Flex,
    Grid,
    Heading,
    HStack,
    Icon,
    Tag,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import {
    useRegisterUserToEvent,
    useUnregisterUserFromEvent,
} from 'hooks/event';
import { GrowEvent } from 'model';
import { useMemo, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';

type GrowEventCardProps = {
    event: GrowEvent;
    registered: boolean;
};

/**
 * Event element component for the grow connact page
 * @param event the event contain all important information of the event.
 * @param registered This parameter set the state for the registration
 * @returns HTML code that display one event with the date, title, description, location, type and if the event is mandatory.
 */

const GrowEventCard: React.FC<GrowEventCardProps> = ({ event, registered }) => {
    const [registeredLocal, setRegisteredLocal] = useState(registered);
    const { registerUser } = useRegisterUserToEvent();
    const { unregisterUser } = useUnregisterUserFromEvent();
    const { user } = useUser();
    const toast = useToast();
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

    async function register() {
        if (!user) return;
        try {
            await registerUser({ user, event });
            toast({
                title: 'Registered to ' + event.title,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setRegisteredLocal(true);
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    async function withdrawRegistration() {
        if (!user) return;
        try {
            await unregisterUser({ user, event });
            toast({
                title: 'Unregistered from ' + event.title,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setRegisteredLocal(false);
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    let actionButton;
    if (registeredLocal) {
        actionButton = (
            <Button onClick={withdrawRegistration} size="xs" variant="outline">
                Withdraw Registration
            </Button>
        );
    } else {
        actionButton = (
            <Button
                onClick={register}
                color="primary"
                size="xs"
                variant="outline"
            >
                Register
            </Button>
        );
    }

    return (
        <Grid
            gap={4}
            gridTemplateColumns="4.5rem 1fr"
            color={over ? 'gray.500' : 'inherit'}
        >
            <VStack alignItems="start">
                <HStack>
                    <Text>{day}</Text>
                    <Text>{month}</Text>
                </HStack>
                <Text>{time}</Text>
            </VStack>
            <Flex flexDir="column">
                <Heading size="md" mb={1}>
                    {event.title}
                </Heading>

                <Text color="gray.400" mb={1}>
                    {event.description}
                </Text>

                <HStack mb={1}>
                    {event.mandatory ? (
                        <Tag>Mandatory</Tag>
                    ) : !over ? (
                        actionButton
                    ) : undefined}
                </HStack>
                <HStack>
                    {event.type ? <Tag>{event.type}</Tag> : undefined}
                    {event.location ? (
                        <Tag>
                            <Icon as={FiMapPin} mr={2} />
                            {event.location}
                        </Tag>
                    ) : undefined}
                </HStack>
            </Flex>
        </Grid>
    );
};

export default GrowEventCard;
