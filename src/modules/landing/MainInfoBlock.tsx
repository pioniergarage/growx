import {
    Box,
    Grid,
    GridItem,
    Heading,
    Show,
    Text,
    VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import AnimatedLogo from './AnimatedLogo';
import ParticipateButton from './ParticipateButton';

const Countdown = dynamic(import('./Countdown'), { ssr: false });

function Fact({ amount, title }: { amount: string; title: string }) {
    return (
        <Box>
            <Heading lineHeight="8" size="xl">
                {amount}
            </Heading>
            <Text>{title}</Text>
        </Box>
    );
}

export default function MainInfoBlock() {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr' }}
            placeItems={{ base: 'center', md: 'start' }}
            textAlign={{ base: 'center', md: 'left' }}
            mt={8}
            gap={6}
        >
            <Show above="md">
                <GridItem
                    placeSelf="center"
                    className="md:order-2"
                    textAlign="center"
                    rowSpan={2}
                >
                    <AnimatedLogo boxSize={250} />
                    <Countdown />
                </GridItem>
            </Show>
            <GridItem className="md:order-1">
                <VStack spacing={4} align={{ base: 'center', md: 'start' }}>
                    <Heading
                        className="neon-text-1"
                        lineHeight={1.0}
                        fontWeight="400"
                        fontSize={{ base: '7rem', md: '10rem' }}
                    >
                        Let it Grow
                    </Heading>
                    <Box>
                        <Heading as="h2" size="md" fontWeight="600">
                            Germany&apos;s Largest Student Founding Contest
                        </Heading>
                        <Text fontWeight="500" lineHeight={1.6}>
                            Become an entrepreneur and advance your idea over 11
                            weeks. Get support, build your prototype and test
                            your market.
                        </Text>
                    </Box>

                    <ParticipateButton />
                </VStack>
            </GridItem>
            <GridItem
                display="flex"
                justifyContent={{ base: 'space-around', md: 'space-between' }}
                className="md:order-3"
                w="100%"
            >
                <Fact title="startups" amount="50+" />
                <Fact title="prizes" amount="20 000€" />
                <Fact title="workshops" amount="11" />
            </GridItem>
        </Grid>
    );
}
