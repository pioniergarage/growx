import { Box, BoxProps, Divider } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import { getEvents } from 'modules/events/api';
import { GrowEvent } from 'modules/events/types';
import { getFAQs } from 'modules/faq/api';
import { FAQ } from 'modules/faq/types';
import Faqs from 'modules/landing/FaqList';
import GrowVideo from 'modules/landing/GrowVideo';
import MainInfoBlock from 'modules/landing/MainInfoBlock';
import MotivationBlock from 'modules/landing/MotivationBlock';
import Timeline from 'modules/landing/ShortTimeline';
import LongTimeline from 'modules/landing/Timeline_current';
import TimelinePlaceholder from 'modules/landing/Timeline_placeholder';
import WaitingForBlock from 'modules/landing/WaitingForBlock';
import SponsorsAndSupporters from 'modules/landing/sponsor/Sponsors';
import { getSponsors } from 'modules/sponsor/api';
import { Sponsor } from 'modules/sponsor/types';
import { PropsWithChildren } from 'react';
import { getCurrentSeason } from 'utils/formatters';

const minutesToSeconds = (minutes: number) => minutes * 60;

export const getStaticProps = async () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    try {
        const sponsors = await getSponsors(supabase);
        const faqs = await getFAQs(supabase);
        const events = (await getEvents(supabase)).map((e) => ({
            ...e,
            date: e.date.toISOString(),
        }));
        return {
            props: { sponsors, faqs, events },
            revalidate: minutesToSeconds(30),
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

interface HomeProps {
    sponsors: Sponsor[];
    faqs: FAQ[];
    events: (Omit<GrowEvent, 'date'> & { date: string })[];
}

const Home: React.FC<HomeProps> = ({
    sponsors = [],
    faqs = [],
    events: jsonEvents = [],
}) => {
    const events = jsonEvents.map((e) => ({ ...e, date: new Date(e.date) }));
    const kickoff = events.filter((e) => e.ref == 'kickoff')[0]
    const midterm = events.filter((e) => e.ref == 'midterm')[0]
    const final = events.filter((e) => e.ref == 'final')[0]
    return (
        <>
            <Section position="relative" minH="80vh">
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
                        filter={{ base: 'blur(80px)', md: 'blur(150px)' }}
                    />
                </Box>
                <MainInfoBlock kickoff={kickoff.date} final={final.date} />
            </Section>

            <Divider mb={12} />

            <Section>
                <GrowVideo />
            </Section>

            <Divider my={20} />

            <Section>
                {/*  das sind die 3 Blöcke mit Kick off, midterm und Final */}
                <Timeline kickoff={kickoff.date} midterm={midterm.date} final={final.date} />
            </Section>

            <Section mt="8rem">
                {/* Why Grow */}
                <MotivationBlock />
            </Section>

            <Section id="timeline" mt="4rem" my="12rem">


                {events.length > 3 ?
                    <LongTimeline events={events} kickoffDate={kickoff.date} />
                    :
                    <TimelinePlaceholder season={getCurrentSeason(kickoff.date)} />
                }
            </Section>

            <Section position="relative" my={24} px={0}>
                <Box
                    maxW="container.xl"
                    top={0}
                    w="100%"
                    h="100%"
                    position="absolute"
                    zIndex={-10}
                >
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        bgGradient="linear-gradient(128.16deg, #5557f777 8.06% , #5557f777 83.26%)"
                        borderRadius="50%"
                        filter="blur(150px)"
                    />
                </Box>
                <WaitingForBlock />
            </Section>

            <Divider my={24} />

            <Section my={24}>
                <SponsorsAndSupporters sponsors={sponsors} />
            </Section>

            <Section id="faqs" my={24}>
                <Faqs faqs={faqs} />
            </Section>
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
