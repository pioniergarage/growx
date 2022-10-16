import { Box, BoxProps, Divider } from '@chakra-ui/react';

import { getEvents } from 'modules/events/api';
import { GrowEvent } from 'modules/events/types';
import { getFAQs } from 'modules/faq/api';
import { FAQ } from 'modules/faq/types';
import Faqs from 'modules/landing/FaqList';
import GrowVideo from 'modules/landing/GrowVideo';
import MainInfoBlock from 'modules/landing/MainInfoBlock';
import MentorList from 'modules/landing/MentorList';
import MotivationBlock from 'modules/landing/MotivationBlock';
import Timeline from 'modules/landing/ShortTimeline';
import SponsorBlock from 'modules/landing/sponsor/SponsorBlock';
import LongTimeline from 'modules/landing/Timeline';
import WaitingForBlock from 'modules/landing/WaitingForBlock';
import { PublicMentorProfile } from 'modules/mentor/types';
import { getPublicMentors } from 'modules/profile/api';
import { getSponsors } from 'modules/sponsor/api';
import { Sponsor } from 'modules/sponsor/types';
import { PropsWithChildren } from 'react';

export async function getServerSideProps() {
    const sponsors = await getSponsors();
    const faqs = await getFAQs();
    const events = (await getEvents()).map((e) => ({
        ...e,
        date: e.date.toISOString(),
    }));
    const mentors = await getPublicMentors();
    return { props: { sponsors, faqs, events, mentors } };
}

interface HomeProps {
    sponsors: Sponsor[];
    faqs: FAQ[];
    events: (Omit<GrowEvent, 'date'> & { date: string })[];
    mentors: PublicMentorProfile[];
}

const Home: React.FC<HomeProps> = ({
    sponsors,
    faqs,
    events: jsonEvents,
    mentors,
}) => {
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

            <Section my="4rem">
                <GrowVideo />
            </Section>

            <Section>
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

            <Section>
                <MentorList mentors={mentors} />
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

export default Home;
