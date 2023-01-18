import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Icon,
    Show,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import AnimatedLogo from './AnimatedLogo';

function Fact({ amount, title }: { amount: string; title: string }) {
    return (
        <Box>
            <Heading lineHeight="8" size={{ base: 'xl', md: '2xl' }}>
                {amount}
            </Heading>
            <Text variant="info">{title}</Text>
        </Box>
    );
}

export default function MainInfoBlock() {
    return (
        <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            placeItems={{ base: 'center', lg: 'start' }}
            textAlign={{ base: 'center', lg: 'left' }}
            mt={8}
            columnGap={6}
            rowGap={12}
        >
            <GridItem colSpan={{ base: 1, lg: 2 }} placeSelf="stretch">
                <Flex
                    alignItems="center"
                    flexDir="column"
                    className="rounded px-3 py-5 border-2"
                >
                    <Heading
                        className="neon-text"
                        fontSize={{ base: '2.5rem', md: '4rem', lg: '5rem' }}
                    >
                        GROW X FINAL
                    </Heading>
                    <Text lineHeight="1.2">
                        An evening full of innovative pitches, disruptive
                        start-ups, renowned speakers & a legendary afterparty!
                    </Text>
                    <Flex alignItems="center" mt={4}>
                        <Icon as={FaClock} mr={2} />
                        <Box fontSize="sm">Sat, 21 Jan, 7pm</Box>
                    </Flex>
                    <Flex alignItems="center">
                        <Icon as={FaMapMarkerAlt} mr={2} />
                        <Box fontSize="sm">
                            Audimax, Straße am Forum, 76131 Karlsruhe
                        </Box>
                    </Flex>
                    <a href="https://grow-x.eventbrite.de" className="pt-5">
                        <Button size="lg" className="block p-2 bg-gray-200">
                            Get Your Free Ticket
                        </Button>
                    </a>
                </Flex>
            </GridItem>
            <GridItem>
                <Flex
                    flexDir="column"
                    gap={4}
                    align={{ base: 'center', md: 'start' }}
                >
                    <Box>
                        <Heading size="lg">
                            Germany&apos;s Largest Student Founding Contest
                        </Heading>
                        <Text variant="info" fontSize="lg">
                            Become an entrepreneur and advance your idea over 11
                            weeks. Get support, build your prototype and test
                            your market.
                        </Text>
                    </Box>
                    <Flex
                        justifyContent={{
                            base: 'space-around',
                            lg: 'space-between',
                        }}
                        w="100%"
                        mt={10}
                    >
                        <Fact title="startups" amount="50+" />
                        <Fact title="prizes" amount="20 000€" />
                        <Fact title="workshops" amount="11" />
                    </Flex>
                </Flex>
            </GridItem>
            <Show above="md">
                <GridItem placeSelf="center" textAlign="center" rowSpan={2}>
                    <AnimatedLogo boxSize={250} />
                </GridItem>
            </Show>
        </Grid>
    );
}
