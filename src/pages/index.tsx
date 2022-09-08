import Faqs from '@/components/landing/FaqList';
import MainInfoBlock from '@/components/landing/MainInfoBlock';
import MotivationBlock from '@/components/landing/MotivationBlock';
import PartnerBlock from '@/components/landing/partner/PartnerBlock';
import Timeline from '@/components/landing/ShortTimeline';
import LongTimeline from '@/components/landing/Timeline';
import WaitingForBlock from '@/components/landing/WaitingForBlock';
import { Box, BoxProps, Divider } from '@chakra-ui/react';
import { getFAQs } from 'api';
import { getEvents } from 'api/events';
import { getSponsors } from 'api/sponsors';
import { FAQ, GrowEvent, Sponsor } from 'model';
import { PropsWithChildren } from 'react';

export async function getStaticProps() {
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
                    transform="translate(-1rem, -50%)"
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
};

export default Home;
