import {
    Button,
    Flex,
    Grid,
    Heading,
    Tag,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import {
    useRegisterUserToEvent,
    useUnregisterUserFromEvent,
} from 'hooks/event';
import { GrowEvent } from 'model';
import { useMemo, useState } from 'react';

type GrowEventCardProps = {
    event: GrowEvent;
    registered: boolean;
};

const GrowEventCard: React.FC<GrowEventCardProps> = ({ event, registered }) => {
    const [registeredLocal, setRegisteredLocal] = useState(registered);
    const { registerUser } = useRegisterUserToEvent();
    const { unregisterUser } = useUnregisterUserFromEvent();
    const { user } = useUser();
    const toast = useToast();
    const { day, month, over } = useMemo(() => {
        const day = String(event.date.getDate()).padStart(2, '0');
        const month = event.date.toLocaleString('en-US', { month: 'short' });
        const over = new Date() > event.date;
        return { day, month, over };
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
            gridTemplateColumns="3.5rem 1fr"
            color={over ? 'gray.500' : 'inherit'}
        >
            <Flex justify="space-between">
                <Text>{day}</Text>
                <Text>{month}</Text>
            </Flex>
            <Flex flexDir="column">
                <Flex gap={2}>
                    <Heading size="md">{event.title}</Heading>
                    {event.mandatory ? (
                        <Tag>mandatory</Tag>
                    ) : !over ? (
                        actionButton
                    ) : undefined}
                    {event.type ? <Tag>{event.type}</Tag> : undefined}
                    {event.location ? <Tag>{event.location}</Tag> : undefined}
                </Flex>
                <Text color="gray.400">{event.description}</Text>
            </Flex>
        </Grid>
    );
};

export default GrowEventCard;
