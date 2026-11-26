import Card from '@/components/Card';
import { Box, Flex, GridItem, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import ReactMarkdown, { type Options } from 'react-markdown';
import { EventCategory, GrowEvent } from '../types';
import EventTagList from './EventTagList';

export type GrowEventCardProps = {
    event: GrowEvent;
    registration?: { present: boolean };
};

type MarkdownNode = {
    type: string;
    value?: string;
    alt?: string;
    children?: MarkdownNode[];
};

function previewText(node: MarkdownNode): string {
    switch (node.type) {
        case 'text':
        case 'inlineCode':
        case 'code':
            return node.value ?? '';
        case 'image':
        case 'imageReference':
            return node.alt ?? '';
        case 'break':
            return '\n';
        case 'list':
        case 'listItem':
        case 'blockquote':
            return node.children?.map(previewText).join('\n') ?? '';
        default:
            return node.children?.map(previewText).join('') ?? '';
    }
}

const previewPlugins: NonNullable<Options['remarkPlugins']> = [
    () => (tree: unknown) => {
        const firstLine = (tree as MarkdownNode).children
            ?.map(previewText)
            .join('\n')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .find(Boolean);
        return {
            type: 'root',
            children: firstLine
                ? [
                      {
                          type: 'paragraph',
                          children: [
                              {
                                  type: 'text',
                                  value: `${firstLine.replace(/[.…]+$/, '')}...`,
                              },
                          ],
                      },
                  ]
                : [],
        };
    },
];

const GrowEventCard: React.FC<GrowEventCardProps> = ({
    event,
    registration
}) => {
    const over = new Date() > event.date;
    const isMidterm = event.ref === 'midterm';

    return (
        <Card
            as={Link}
            href={`/connect/events/${event.id}`}
            display="grid"
            alignItems="center"
            gridTemplateColumns={{ base: '1fr 2fr', md: '10rem 2fr' }}
            px={3}
            pt={4}
            pb={3}
            columnGap={{ base: 2, md: 4 }}
            opacity={over ? 0.33 : 1}
            cursor="pointer"
            bgColor={event.eventCategory === EventCategory.Grow ? "rgba(211, 77, 188, 0.25)" : "whiteAlpha.50"}
            _hover={{ bgColor: event.eventCategory === EventCategory.Grow ? "rgba(211, 77, 188, 0.5)" : "whiteAlpha.100" }}
            _focus={{ bgColor: event.eventCategory === EventCategory.Grow ? "rgba(211, 77, 188, 0.75)" : "whiteAlpha.200" }}
            _focusVisible={{ boxShadow: 'outline' }}
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
            <Box minW={0}>
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
                </Flex>

                <EventTagList
                    event={event}
                    registration={over || isMidterm ? undefined : registration}
                    transparent
                    gap={0}
                />
                {isMidterm && event.description?.trim() && (
                    <ReactMarkdown
                        remarkPlugins={previewPlugins}
                        components={{
                            p: ({ children }) => (
                                <Text mt={1} fontSize="sm" isTruncated>
                                    {children}
                                </Text>
                            ),
                        }}
                    >
                        {event.description}
                    </ReactMarkdown>
                )}
            </Box>
        </Card>
    );
};

export default GrowEventCard;
