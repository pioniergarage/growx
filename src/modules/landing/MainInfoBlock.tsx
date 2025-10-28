import KickoffCTA from '@/components/KickoffCTA';
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Show,
    Text
} from '@chakra-ui/react';
import EventTag from 'modules/events/components/EventTag';
import { GrowEvent } from 'modules/events/types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { growFormattedDate } from 'utils/formatters';
import AnimatedLogo from './AnimatedLogo';

type InfoBlockProps = {
    kickoff: GrowEvent;
    final: GrowEvent;
    today: Date;
};

function Fact({ amount, title, location }: { amount: string; title: string, location: string }) {
    return (
        <Box>
            <Text variant="info">{title}</Text>
            <Heading lineHeight="8" size={{ base: 'xl', md: '2xl' }}>
                {amount}
            </Heading>
            <Box>
                <EventTag icon={FaMapMarkerAlt} transparent={false}>
                    {location}
                </EventTag>
            </Box>
        </Box>
    );
}

const MainInfoBlock: React.FC<InfoBlockProps> = ({
    kickoff,
    final,
    today
}) => {
    return (
        <Grid
            templateColumns={{ base: '1fr', lg: '3fr 2fr' }}
            placeItems={{ base: 'center', lg: 'start' }}
            textAlign={{ base: 'center', lg: 'left' }}
            mt={{
                base: '0',
                lg: '4',
            }}
            columnGap={6}
            rowGap={12}
        >
            <GridItem>
                <Flex
                    flexDir="column"
                    gap={2}
                    align={{ base: 'center', md: 'start' }}
                >
                    <Heading
                        className="neon-text"
                        lineHeight={0.9}
                        fontWeight="400"
                        fontSize={{ base: '5.5rem', md: '6.5rem' }}
                        mt={{
                            base: '0',
                            lg: '5%'
                        }}
                    >
                        Let it <span className="neon-text2">Grow</span>
                    </Heading>
                    <Box>
                        <Heading size="lg" lineHeight={1}>
                            Germany&apos;s Largest Student Founding Contest
                        </Heading>
                        <Text variant="info" fontSize="lg">
                            Become an entrepreneur: advance your idea or turn your research into impact over 11
                            weeks. <br></br> Get support, build your prototype
                            and test your market.
                        </Text>
                    </Box>
                    <Flex
                        justifyContent={{
                            base: 'space-around',
                            lg: 'space-between',
                        }}
                        w="100%"
                        mt={{
                            base: '2',
                            lg: '10%',
                        }}
                        mb='4'
                        flexFlow={{
                            base: 'column',
                            lg: 'row'
                        }}
                        gap="4"
                    >

                        <Flex flexDir="column"
                            gap={4}
                            align={{ base: 'center', md: 'start' }}
                            mb={8}
                        >
                            <Fact
                                title="Start Kick-Off"
                                amount={growFormattedDate(kickoff.date, today)}
                                location={kickoff.location}
                            />
                            <KickoffCTA today={today} kickoff={kickoff} />
                        </Flex>
                        <Fact
                            title="Finale in Karlsruhe"
                            amount={growFormattedDate(final.date, today)}
                            location={final.location}
                        />
                    </Flex>
                </Flex>

            </GridItem>
            <Show above="md">
                <GridItem placeSelf="center" textAlign="center" rowSpan={2}>
                    <Flex className=" flex-col">
                        <AnimatedLogo boxSize={250} />
                    </Flex>
                </GridItem>
            </Show>
        </Grid>
    );
}


export default MainInfoBlock;