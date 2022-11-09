import { Box, BoxProps, Divider, Show } from '@chakra-ui/react';
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
import Sponsors from 'modules/landing/sponsor/Sponsors';
import LongTimeline from 'modules/landing/Timeline';
import WaitingForBlock from 'modules/landing/WaitingForBlock';
import { getSponsors } from 'modules/sponsor/api';
import { Sponsor } from 'modules/sponsor/types';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
const ParticleBackground = dynamic(
    () => import('@/components/ParticleBackground')
);

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
    return (
        <>
            <Show above="lg">
                <ParticleBackground />
            </Show>
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
                <MainInfoBlock />
            </Section>

            <Divider mb={20} />

            <Section>
                <GrowVideo />
            </Section>

            <Divider my={20} />

            <Section>
                <Timeline />
            </Section>

            <Section mt="8rem">
                <MotivationBlock />
            </Section>

            <Section id="timeline" mt="4rem">
                <LongTimeline events={events} />
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

            <Section id="faqs" mt={24}>
                <Faqs faqs={faqs} />
            </Section>

            <Section mt={20}>
                <Sponsors sponsors={sponsors} />
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
