import Card from '@/components/Card';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useMemo } from 'react';
import { GrowEvent } from '../types';
import EventTagList from './EventTagList';

export type GrowEventCardProps = {
    event: GrowEvent;
    registration?: { present: boolean };
};

const GrowEventCard: React.FC<GrowEventCardProps> = ({
    event,
    registration,
}) => {
    const over = useMemo(() => new Date() > event.date, [event.date]);

    return (
        <Link href={'/connect/events/' + event.id}>
            <Card
                as={Grid}
                alignItems="center"
                gridTemplateColumns={{ base: '1fr 2fr', md: '10rem 2fr' }}
                px={3}
                pt={4}
                pb={3}
                columnGap={{ base: 2, md: 4 }}
                opacity={over ? 0.5 : 1}
                cursor="pointer"
                _hover={{ bgColor: 'whiteAlpha.100' }}
                _focus={{ bgColor: 'whiteAlpha.200' }}
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

                    <Flex
                        mt={1}
                        flexWrap="wrap"
                        gap={8}
                        flexDir={{ base: 'column', sm: 'row' }}
                        alignItems="center"
                    >
                        <Heading size={{ base: 'xs', sm: 'md' }}>
                            {event.title}
                        </Heading>

                        {event.href &&
                            <Button leftIcon={<ExternalLinkIcon />} size='xs' onClick={() => { window.location.href = event.href as string }}>Link</Button>
                        }
                    </Flex>
                    <EventTagList
                        event={event}
                        registration={over ? undefined : registration}
                        transparent
                        gap={0}
                    />
                </Box>
            </Card>
        </Link >
    );
};

export default GrowEventCard;
