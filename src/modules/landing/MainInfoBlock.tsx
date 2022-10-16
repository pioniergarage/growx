import AnimatedLogo from './AnimatedLogo';
import { Box, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { isSignUpEnabled, signUpStart } from 'utils/dates';
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
            <GridItem
                placeSelf="center"
                className="md:order-2"
                textAlign="center"
                rowSpan={2}
            >
                <AnimatedLogo boxSize={250} />
                <Countdown />
            </GridItem>
            <GridItem className="md:order-1">
                <VStack spacing={4} align={{ base: 'center', md: 'start' }}>
                    <Heading
                        bgClip="text"
                        bgGradient="linear(to-l, pink.100, purple.300)"
                        size={{ base: '2xl', md: '3xl' }}
                    >
                        <Text lineHeight={1.1}>
                            Germany&apos;s Largest Student Founding Contest
                        </Text>
                    </Heading>
                    <Text>
                        Become an entrepreneur and advance your idea over 11
                        weeks. Get support, build your prototype and test your
                        market.
                    </Text>

                    <Box>
                        <ParticipateButton />
                        <Box mt={2}>
                            {isSignUpEnabled ? undefined : (
                                <Text variant="info">
                                    Sign-up from{' '}
                                    {signUpStart.toLocaleDateString()}
                                </Text>
                            )}
                        </Box>
                    </Box>
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
