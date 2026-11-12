import EventCTA from '@/components/EventCTA';
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
    kickoff?: GrowEvent;
    midterm?: GrowEvent;
    final?: GrowEvent;
    today: Date;
    /** Last day (YYYY-MM-DD) on which the sign up button is shown. Not shown if null. */
    signupDeadline?: string | null;
};

/** Parses YYYY-MM-DD and returns the start of the following day (local time), or undefined if invalid. */
function endOfDay(date?: string | null): Date | undefined {
    const match = date?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return undefined;
    const [, year, month, day] = match.map(Number);
    return new Date(year, month - 1, day + 1);
}

/** Calendar day (YYYY-MM-DD) in German time, used to compare dates by day instead of exact time. */
function toBerlinDay(date: Date): string {
    return date.toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });
}

function Fact({ amount, title, location }: { amount: string; title: string, location: string }) {
    return (
        <Box>
            <Text variant="info">{title}</Text>
            <Heading lineHeight="8" size={{ base: 'xl', md: '2xl' }}>
                {amount}
            </Heading>
            <Box className='mt-2'>
                <EventTag icon={FaMapMarkerAlt} transparent={false}>
                    {location}
                </EventTag>
            </Box>
        </Box>
    );
}

const MainInfoBlock: React.FC<InfoBlockProps> = ({
    kickoff,
    midterm,
    final,
    today,
    signupDeadline
}) => {
    const signupEnd = endOfDay(signupDeadline);
    // Hide the kickoff sign up button from the kickoff day on (same as the sign up link on the login page)
    const isBeforeKickoffDay = !!kickoff && toBerlinDay(today) < toBerlinDay(kickoff.date);
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
                    <Box className='pt-6 grid gap-2'>
                        <Heading size="lg" lineHeight={1}>
                            The KIT Startup Competition.
                        </Heading>
                        <Text variant="info" fontSize="lg">
                            Become an entrepreneur: advance your idea or turn your research into impact over 11
                            weeks. <br></br> Get support, build your prototype
                            and test your market.
                        </Text>

                    </Box>
                    <Flex
                        justifyContent={{
                            base: 'center',
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
                        {signupEnd && (
                            <EventCTA
                                today={today}
                                event_date={signupEnd}
                                event_href="/connect/signup"
                                text="Sign up for GROW!"
                            />
                        )}
                        <EventCTA today={today} event={final} start={midterm?.date} text='Join us at the GROW Final!' />
                    </Flex>
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
                            {kickoff && <Fact
                                title="Start Kick-Off"
                                amount={growFormattedDate(kickoff.date, today)}
                                location={kickoff.location}
                            />}

                            {isBeforeKickoffDay && (
                                <EventCTA today={today} event={kickoff} text='Sign Up for the Kickoff!' />
                            )}
                        </Flex>
                        {final && <Fact
                            title="Finale in Karlsruhe"
                            amount={growFormattedDate(final.date, today)}
                            location={final.location}
                        />}

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