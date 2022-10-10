import Faqs from '@/components/landing/FaqList';
import GrowVideo from '@/components/landing/GrowVideo';
import MainInfoBlock from '@/components/landing/MainInfoBlock';
import MotivationBlock from '@/components/landing/MotivationBlock';
import Timeline from '@/components/landing/ShortTimeline';
import SponsorBlock from '@/components/landing/sponsor/SponsorBlock';
import LongTimeline from '@/components/landing/Timeline';
import WaitingForBlock from '@/components/landing/WaitingForBlock';
import { Box, BoxProps, Divider } from '@chakra-ui/react';
import { getFAQs } from 'database';
import { getEvents } from 'database/events';
import { getSponsors } from 'database/sponsors';
import { FAQ, GrowEvent, Sponsor } from 'model';
import { PropsWithChildren } from 'react';

export async function getServerSideProps() {
    const sponsors = await getSponsors();
    const faqs = await getFAQs();
    const events = (await getEvents()).map((e) => ({
        ...e,
        date: e.date.toISOString(),
    }));
    return { props: { sponsors, faqs, events } };
}

function Section({
    children,
    divider = false,
    ...rest
}: PropsWithChildren & { divider?: boolean } & BoxProps) {
    return (
        <Box as="section" my={8} {...rest}>
            <Box mx="auto" maxW="container.xl">
                {children}
                {divider && <Divider my={8} />}
            </Box>
        </Box>
    );
}

interface HomeProps {
    sponsors: Sponsor[];
    faqs: FAQ[];
    events: (Omit<GrowEvent, 'date'> & { date: string })[];
}

const Home: React.FC<HomeProps> = ({ sponsors, faqs, events: jsonEvents }) => {
    const events = jsonEvents.map((e) => ({ ...e, date: new Date(e.date) }));
    return (
        <>
            <Section divider position="relative">
                <Box
                    maxW="container.xl"
                    transform="translate(0, -50%)"
                    top={0}
                    w="100%"
                    h={{ base: '40rem', md: '100%' }}
                    position="absolute"
                    zIndex={-10}
                    opacity={0.6}
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

            <Section>
                <GrowVideo />
            </Section>

            <Section mt="8rem">
                <Timeline />
            </Section>

            <Section divider mt="8rem">
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

            <Section divider id="faqs" mt={24}>
                <Faqs faqs={faqs} />
            </Section>

            <Section mt={6}>
                <SponsorBlock sponsors={sponsors} />
            </Section>
        </>
    );
};

export default Home;
