import { HStack, VStack, Flex, Heading, Tag, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { EventType, GrowEvent } from 'model';

export default function TimelineEvent(event: GrowEvent) {
    const { day, month } = useMemo(() => {
        const date = new Date(event.date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        return { day, month };
    }, [event.date]);

    const over = new Date() > new Date(event.date);

    return (
        <HStack
            gap={4}
            alignItems="start"
            color={over ? 'gray.500' : 'inherit'}
        >
            <VStack
                lineHeight={0.7}
                alignItems="end"
                fontSize="2xl"
                fontWeight="semibold"
                width="3.5rem"
                flexShrink={0}
            >
                <Text>{day}</Text>
                <Text>{month}</Text>
            </VStack>
            <Flex flexDir="column" alignItems="start">
                <Heading size="md">{event.title}</Heading>
                <Text mt={0}>{event.description}</Text>
                <HStack mt={1}>
                    {event.mandatory ? <Tag>Mandatory</Tag> : <></>}^
                    {event.location ? <Tag>{event.location}</Tag> : undefined}
                    {event.type ? <Tag>{event.type}</Tag> : undefined}
                    <Tag> {EventType.Hybrid}</Tag>
                </HStack>
            </Flex>
        </HStack>
    );
}
