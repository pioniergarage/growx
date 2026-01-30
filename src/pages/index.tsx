import EventCTA from '@/components/EventCTA';
import { Box, BoxProps, Divider, Flex } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import ical, { ICalCalendarMethod } from 'ical-generator';
import { getEvents } from 'modules/events/api';
import { GrowEvent } from 'modules/events/types';
import { getFAQs } from 'modules/faq/api';
import { FAQ } from 'modules/faq/types';
import Faqs from 'modules/landing/FaqList';
import GrowVideo from 'modules/landing/GrowVideo';
import LongTimeline from 'modules/landing/LongTimeline';
import MainInfoBlock from 'modules/landing/MainInfoBlock';
import MotivationBlock from 'modules/landing/MotivationBlock';
import ShortTimeline from 'modules/landing/ShortTimeline';
import TimelinePlaceholder from 'modules/landing/Timeline_placeholder';
import WaitingForBlock from 'modules/landing/WaitingForBlock';
import SponsorsAndSupporters from 'modules/landing/sponsor/Sponsors';
import { getSponsors } from 'modules/sponsor/api';
import { Sponsor } from 'modules/sponsor/types';
import path from 'path';
import { PropsWithChildren } from 'react';
import { getSeason } from 'utils/formatters';

export const createCalendar = (events: GrowEvent[]) => {
    const calendar = ical({ name: 'PionierGarage GROW Events' });
    calendar.method(ICalCalendarMethod.REQUEST);

    for (const e of events) {
        calendar.createEvent({
            start: new Date(e.date),
            end: new Date(new Date(e.date).getTime() + 60 * 60 * 1000),
            summary: e.title,
            description: e.description,
            location: e.location ?? '',
            url: e.href ?? 'https://grow.pioniergarage.de/',
        });
    }

    return calendar.toString();
};

export const getStaticProps = async () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    const sponsors = await getSponsors(supabase);
    const faqs = await getFAQs(supabase);
    const events = await getEvents(supabase);
    const jsonEvents = events.map((e) => ({
        ...e,
        date: e.date.toISOString(),
    }));

    // Save events to ical file (for calendar api)
    fs.writeFileSync(
        path.join(process.cwd(), 'public', 'grow_calendar.ics'),
        createCalendar(events)
    );

    return {
        props: { sponsors, faqs, jsonEvents },
        revalidate: 60 * 30,
    };
};

interface HomeProps {
    sponsors: Sponsor[];
    faqs: FAQ[];
    jsonEvents: (Omit<GrowEvent, 'date'> & { date: string })[];
}

const Home: React.FC<HomeProps> = ({
    sponsors = [],
    faqs = [],
    jsonEvents = [],
}) => {
    const events = jsonEvents.map((e) => ({ ...e, date: new Date(e.date) }));
    const kickoff: GrowEvent | undefined = events.find(
        (e) => e.ref === 'kickoff'
    );
    const midterm: GrowEvent | undefined = events.find(
        (e) => e.ref === 'midterm'
    );
    const final: GrowEvent | undefined = events.find((e) => e.ref === 'final');
    const today = new Date();
    if (!kickoff && midterm && final) {
        console.log(
            "Database administrator: Please ensure the events with ref=='kickoff', ref=='midterm' and ref=='final' exist on the database!"
        );
    }
    return (
        <>
            {kickoff && midterm && final ? (
                <>
                    <Section position="relative" minH="75vh">
                        <Box
                            maxW="container.xl"
                            transform="translate(0, -50%)"
                            top={0}
                            w="100%"
                            h={{ base: '40rem', md: '100%' }}
                            position="absolute"
                            zIndex={-10}
                        >
                            <Box
                                position="absolute"
                                width="100%"
                                height="100%"
                                bgGradient="linear-gradient(128.16deg, #5557f777 8.06%, #d34dbc80 45% , #d6265170 83.26%)"
                                borderRadius="50%"
                                filter={{
                                    base: 'blur(80px)',
                                    md: 'blur(150px)',
                                }}
                            />
                        </Box>
                        <MainInfoBlock
                            kickoff={kickoff}
                            midterm={midterm}
                            final={final}
                            today={today}
                        />
                    </Section>

                    <Divider mb={12} />

                    <Section>
                        <GrowVideo />
                    </Section>

                    <Divider my={10} />

                    <Section>
                        {/*  das sind die 3 Blöcke mit Kick off, midterm und Final */}
                        <ShortTimeline
                            kickoff={kickoff}
                            midterm={midterm}
                            final={final}
                        />
                    </Section>

                    <Section mt="8rem">
                        {/* Why Grow */}
                        <MotivationBlock />
                    </Section>

                    <Section id="timeline" mt="8rem" mb="4rem">
                        {events.length > 3 ? (
                            <LongTimeline
                                events={events}
                                kickoffDate={kickoff.date}
                            />
                        ) : (
                            <TimelinePlaceholder
                                season={getSeason(kickoff.date)}
                            />
                        )}
                    </Section>

                    <Section position="relative" px={0}>
                        <WaitingForBlock />
                        <Flex flexDir="column" align="center" mt={6}>
                            <EventCTA
                                today={today}
                                event={final}
                                start={midterm.date}
                                text="Visit this year's GROW Final!"
                            />
                            <EventCTA
                                today={today}
                                event={kickoff}
                                text="Sign Up for the Kickoff!"
                            />
                        </Flex>
                    </Section>

                    <Divider my={16} />

                    <Section my={24}>
                        <SponsorsAndSupporters sponsors={sponsors} />
                    </Section>

                    <Section id="faqs" my={24}>
                        <Faqs faqs={faqs} />
                    </Section>
                </>
            ) : (
                <>
                    <Section position="relative" minH="75vh">
                        <Box
                            maxW="container.xl"
                            transform="translate(0, -50%)"
                            top={0}
                            w="100%"
                            h={{ base: '40rem', md: '100%' }}
                            position="absolute"
                            zIndex={-10}
                        >
                            <Box
                                position="absolute"
                                width="100%"
                                height="100%"
                                bgGradient="linear-gradient(128.16deg, #5557f777 8.06%, #d34dbc80 45% , #d6265170 83.26%)"
                                borderRadius="50%"
                                filter={{
                                    base: 'blur(80px)',
                                    md: 'blur(150px)',
                                }}
                            />
                        </Box>
                        <MainInfoBlock today={today} />
                    </Section>

                    <Divider mb={12} />

                    <Section>
                        <GrowVideo />
                    </Section>

                    <Divider my={10} />

                    <Section>
                        {/*  das sind die 3 Blöcke mit Kick off, midterm und Final */}
                        {/* <ShortTimeline kickoff={kickoff} midterm={midterm} final={final} /> */}
                    </Section>

                    <Section mt="8rem">
                        {/* Why Grow */}
                        <MotivationBlock />
                    </Section>

                    <Section id="timeline" mt="8rem" mb="4rem">
                        <TimelinePlaceholder season={getSeason(new Date())} />
                    </Section>

                    <Section position="relative" px={0}>
                        <WaitingForBlock />
                        <Flex flexDir="column" align="center" mt={6}>
                            <EventCTA
                                today={today}
                                start={today}
                                text="Want to learn more?"
                                event_href="https://www.pioniergarage.de/kontakt"
                            />
                        </Flex>
                    </Section>

                    <Divider my={16} />

                    <Section my={24}>
                        <SponsorsAndSupporters sponsors={sponsors} />
                    </Section>

                    <Section id="faqs" my={24}>
                        <Faqs faqs={faqs} />
                    </Section>
                </>
            )}
        </>
    );
};

function Section({ children, ...rest }: PropsWithChildren & BoxProps) {
    return (
        <Box as="section" {...rest}>
            <Box mx="auto" maxW="container.xl">
                {children}
            </Box>
        </Box>
    );
}

export default Home;
