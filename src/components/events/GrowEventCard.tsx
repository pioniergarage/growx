import {
    useToast,
    Tooltip,
    Button,
    HStack,
    Flex,
    VStack,
    Heading,
    Tag,
    Text,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useState, useMemo } from 'react';
import { GrowEvent } from 'types';

type GrowEventCardProps = {
    event: GrowEvent;
    registered: boolean;
};

export default function GrowEventCard({
    event,
    registered,
}: GrowEventCardProps) {
    const [registeredLocal, setRegisteredLocal] = useState(registered);
    const { user } = useUser();
    const toast = useToast();
    const { day, month } = useMemo(() => {
        const day = String(event.date.getDate()).padStart(2, '0');
        const month = event.date.toLocaleString('en-US', { month: 'short' });
        return { day, month };
    }, [event.date]);
    const over = new Date() > new Date(event.date);

    async function register() {
        const { error } = await supabaseClient
            .from('registrations')
            .insert({ user_id: user?.id, event_id: event.id });
        if (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Registered to ' + event.title,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setRegisteredLocal(true);
        }
    }

    async function withdrawRegistration() {
        const { error } = await supabaseClient
            .from('registrations')
            .delete()
            .match({ event_id: event.id, user_id: user?.id });
        if (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Unregistered from ' + event.title,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setRegisteredLocal(false);
        }
    }

    let actionButton;
    if (event.mandatory) {
        actionButton = (
            <Tooltip label="Event is mandatory" shouldWrapChildren>
                <Button disabled={true} size="sm" variant="outline">
                    Withdraw Registration
                </Button>
            </Tooltip>
        );
    } else if (registeredLocal) {
        actionButton = (
            <Button onClick={withdrawRegistration} size="sm" variant="outline">
                Withdraw Registration
            </Button>
        );
    } else {
        actionButton = (
            <Button
                onClick={register}
                color="primary"
                size="sm"
                variant="outline"
            >
                Register
            </Button>
        );
    }

    return (
        <HStack
            gap={4}
            alignItems="start"
            color={over ? 'gray.500' : 'inherit'}
        >
            <Flex justify="space-between" w="3.5rem" fontWeight="semibold">
                <Text>{day}</Text>
                <Text>{month}</Text>
            </Flex>
            <VStack alignItems="start">
                <HStack>
                    <Heading size="md">{event.title}</Heading>
                    {event.mandatory ? <Tag>mandatory</Tag> : undefined}
                    {event.location ? <Tag>{event.location}</Tag> : undefined}
                    {event.online ? <Tag>online</Tag> : undefined}
                </HStack>
                <Text>{event.description}</Text>
                {!over ? actionButton : undefined}
            </VStack>
        </HStack>
    );
}
