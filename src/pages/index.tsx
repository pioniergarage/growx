import MainInfoBlock from '@/components/landing/MainInfoBlock';
import Timeline from '@/components/landing/ShortTimeline';
import MotivationBlock from '@/components/landing/MotivationBlock';
import WaitingForBlock from '@/components/landing/WaitingForBlock';
import PartnerBlock from '@/components/landing/PartnerBlock';
import { supabaseClient as supabase } from '@supabase/auth-helpers-nextjs';
import { EventType, GrowEvent, GrowEventDto, Sponsor } from 'types';
import { PropsWithChildren } from 'react';
import { Box, BoxProps, Divider } from '@chakra-ui/react';
import Faqs, { FaqType } from '@/components/landing/FaqList';
import LongTimeline from '@/components/landing/Timeline';

export async function getStaticProps() {
    const { data: sponsors, error: sponsorError } = await supabase
        .from('sponsors')
        .select('*');
    const { data: faqs, error: faqError } = await supabase
        .from('faqs')
        .select('*');
    const { data: events, error: eventsError } = await supabase
        .from<GrowEventDto>('events')
        .select('*')
        .order('date');
    const { data: event_types, error: event_typeError } = await supabase
        .from<EventType>('event_types')
        .select('*');
    if (sponsorError) {
        throw Error(sponsorError.message);
    }
    if (faqError) {
        throw Error(faqError.message);
    }
    if (eventsError) {
        throw Error(eventsError.message);
    }
    if (event_typeError) {
        throw Error(event_typeError.message);
    }
    return { props: { sponsors, faqs, events } };
}

function Section({
    children,
    divider = false,
    ...rest
}: PropsWithChildren & { divider?: boolean } & BoxProps) {
    return (
        <Box as="section" px={{ base: 4, xl: 0 }} my={8} {...rest}>
            <Box mx="auto" maxW="container.xl">
                {children}
                {divider && <Divider my={8} />}
            </Box>
        </Box>
    );
}

export default function Home({
    sponsors,
    faqs,
    events,
}: {
    sponsors: Sponsor[];
    faqs: FaqType[];
    events: GrowEvent[];
}) {
    return (
        <>
            <Section divider position="relative">
                <Box
                    maxW="container.xl"
                    transform="translate(-1rem, -50%)"
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
                        filter={{ base: 'blur(20px)', md: 'blur(150px)' }}
                    />
                </Box>
                <MainInfoBlock />
            </Section>

            <Section divider>
                <Timeline />
            </Section>

            <Section divider>
                <MotivationBlock />
            </Section>

            <Section id="timeline">
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

            <Section divider id="faqs">
                <Faqs faqs={faqs} />
            </Section>

            <Section mt={6}>
                <PartnerBlock sponsors={sponsors} />
            </Section>
        </>
    );
}
