import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Show,
    Spacer,
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
};

function Fact({ amount, title, location }: { amount: string; title: string, location: string }) {
    const style = { marginTop: 8 }

    return (
        <Box>
            <Text variant="info">{title}</Text>
            <Heading lineHeight="8" size={{ base: 'xl', md: '2xl' }}>
                {amount}
            </Heading>

            <div style={style}>
                <EventTag icon={FaMapMarkerAlt} transparent={false}>
                    {location}
                </EventTag>
            </div>
        </Box>
    );
}

const MainInfoBlock: React.FC<InfoBlockProps> = ({
    kickoff,
    final
}) => {
    const today = new Date();
    return (
        <Grid
            templateColumns={{ base: '1fr', lg: '3fr 2fr' }}
            placeItems={{ base: 'center', lg: 'start' }}
            textAlign={{ base: 'center', lg: 'left' }}
            mt={{
                base: '2',
                lg: '4',
            }}
            columnGap={6}
            rowGap={12}
        >
            <GridItem>
                <Flex
                    flexDir="column"
                    gap={4}
                    align={{ base: 'center', md: 'start' }}
                >
                    <Heading
                        className="neon-text"
                        lineHeight={1.0}
                        fontWeight="400"
                        fontSize={{ base: '6rem', md: '6.5rem' }}
                        mt={{
                            lg: '5%',
                        }}
                    >
                        Let it <span className="neon-text2">Grow</span>
                    </Heading>
                    <Box className=" mt-2">
                        <Heading size="lg">
                            Germany&apos;s Largest Student Founding Contest
                        </Heading>
                        <Text variant="info" fontSize="lg">
                            Become an entrepreneur and advance your idea over 11
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
                            base: '6',
                            lg: '10%',
                        }}
                        flexFlow={{
                            base: 'column',
                            lg: 'row'
                        }}
                        gap="2"
                    >

                        <Flex flexDir="column"
                            gap={4}
                            align={{ base: 'center', md: 'start' }}
                        >
                            <Fact
                                title="Start Kick-Off"
                                amount={growFormattedDate(kickoff.date, today)}
                                location={kickoff.location}
                            />
                            {(today < kickoff.date && kickoff.href && kickoff.href.length > 0) &&
                                <Box paddingTop={2} paddingBottom={2}>
                                    <Button padding={6} paddingLeft={8} paddingRight={8} leftIcon={<ExternalLinkIcon />} onClick={() => { if (kickoff.href) window.location.href = kickoff.href }}><Heading size={{ base: 'm', md: 'l' }}>
                                        Sign Up for the Kickoff!
                                    </Heading></Button>
                                    <Spacer mb='8' />
                                </Box>
                            }
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