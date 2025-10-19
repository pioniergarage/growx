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

            {/* hier nohc bisschen padding */}
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
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            placeItems={{ base: 'center', lg: 'start' }}
            textAlign={{ base: 'center', lg: 'left' }}
            mt={8}
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
                            lg: '10%',
                        }}
                    >
                        Let it <span className="neon-text2">Grow</span>
                    </Heading>
                    <Box className=" mt-3">
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
                            lg: '30%',
                        }}
                        flexFlow={{
                            base: 'column',
                            lg: 'row',
                        }}
                    >
                        <Fact
                            title="Start Kick-Off"
                            amount={growFormattedDate(kickoff.date, today)}
                            location={kickoff.location}
                        />
                        <Fact
                            title="Finale in Karlsruhe"
                            amount={growFormattedDate(final.date, today)}
                            location={final.location}
                        />
                    </Flex>
                    {(today < kickoff.date && kickoff.href && kickoff.href.length > 0) &&
                        <>
                            <Spacer mb='4' />
                            <Button leftIcon={<ExternalLinkIcon />} onClick={() => { if (kickoff.href) window.location.href = kickoff.href }}>Sign Up for the Kickoff!</Button>
                        </>
                    }
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