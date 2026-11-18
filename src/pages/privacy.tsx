import LegalLinks from '@/components/navigation/LegalLinks';
import { GrowLogo } from '@/components/navigation/Nav';
import { Container, Heading, Link, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { NextPageWithLayout } from 'utils/types';

const Privacy: NextPageWithLayout = () => (
    <Container maxW="container.md" py={8}>
        <Head>
            <title>GROW Privacy Notice</title>
        </Head>
        <Stack spacing={8}>
            <GrowLogo alignSelf="flex-start" />
            <Stack as="main" spacing={8}>
                <Heading as="h1">GROW Privacy Notice</Heading>
                <Stack as="section" spacing={2}>
                    <Heading as="h2" size="md">
                        Who is responsible for your data
                    </Heading>
                    <Text>
                        Pioniergarage e.V., Straße am Forum 1, 76131 Karlsruhe,
                        Germany, operates GROW and is the data controller. For
                        privacy enquiries, contact PionierGarage IT at{' '}
                        <Link
                            href="mailto:datenschutz@pioniergarage.de"
                            textDecoration="underline"
                        >
                            datenschutz@pioniergarage.de
                        </Link>
                        .
                    </Text>
                </Stack>
                <Stack as="section" spacing={2}>
                    <Heading as="h2" size="md">
                        Visiting the site
                    </Heading>
                    <Text>
                        When you open a page, our hosting infrastructure
                        receives connection information such as your IP address
                        and the requested page so it can deliver the site.
                    </Text>
                </Stack>
                <Stack as="section" id="registration" spacing={2}>
                    <Heading as="h2" size="md">
                        Registration and GROW Connect
                    </Heading>
                    <Text>
                        We use your email address and password to create and
                        secure your account. We use profile information such as
                        your name, country, gender and phone number to set up
                        your profile and organise participation. Depending on
                        your role, we may ask about your university, skills or
                        background. You can add a profile picture later.
                    </Text>
                    <Text>
                        Registration requires an email address, password, name
                        and country. Participants must also answer whether they
                        have a team. Participants who register as students must
                        provide their university and its country. You cannot
                        finish the relevant registration steps without the
                        required information. Your phone number, startup idea,
                        expectations and how you heard about GROW can be left
                        blank.
                    </Text>
                    <Text>
                        We save the team answer and any optional answers from
                        that step with your email address, even if you leave
                        before creating an account. Please avoid including other
                        people’s personal data in your answers.
                    </Text>
                    <Text>
                        If someone prepares a mentor or buddy invitation for
                        you, they can supply your name and email address. We use
                        the details from the invitation to prefill your
                        registration form.
                    </Text>
                    <Text>
                        GROW Connect uses Supabase for authentication, database
                        records and uploaded images. We use your email address
                        to send a password reset link when you request one.
                        Session cookies keep you signed in.
                    </Text>
                </Stack>
                <Stack as="section" spacing={2}>
                    <Heading as="h2" size="md">
                        Teams, mentoring and events
                    </Heading>
                    <Text>
                        We use team profiles, member names and profile images,
                        join requests, and support requests to organise teams
                        and match them with mentors. GROW Connect displays team
                        information in the signed-in team views and provides
                        assigned mentors with team lead contact details.
                    </Text>
                    <Text>
                        When you register for an event, we record which event
                        you register for and whether you plan to attend online
                        or in person. Organisers can use profile and contact
                        details to coordinate participation and can export
                        profile, team and event registration lists.
                    </Text>
                </Stack>
                <Stack as="section" spacing={2}>
                    <Heading as="h2" size="md">
                        Site analytics and external videos
                    </Heading>
                    <Text>
                        If you opt in to analytics, we use Google Analytics to
                        understand public page visits and interactions. Google
                        receives information about your visit and browser and
                        may store or read analytics identifiers on your device.
                        Analytics is disabled on GROW Connect pages.
                    </Text>
                    <Text>
                        If you opt in to external media, embedded YouTube videos
                        connect to Google when loaded. Google can receive
                        connection and playback data and may store or read
                        information on your device.{' '}
                        <Link
                            href="https://policies.google.com/privacy"
                            textDecoration="underline"
                        >
                            Google’s privacy information
                        </Link>
                        .
                    </Text>
                    <Text>
                        Both features depend on your consent (GDPR Article
                        6(1)(a) and § 25(1) TDDDG for device storage or access).
                        You can change or withdraw either choice at any time
                        through Cookie settings below. We save your preferences
                        in your browser’s local storage so they apply on later
                        visits.
                    </Text>
                </Stack>
                <Stack as="section" spacing={2}>
                    <Heading as="h2" size="md">
                        Photo and video publication
                    </Heading>
                    <Text>
                        You can register without giving permission to publish
                        photos or videos of you. If we ask for that consent, we
                        will do so separately and explain where the material
                        would appear and how to withdraw your consent.
                    </Text>
                </Stack>
                <Stack as="section" spacing={2}>
                    <Heading as="h2" size="md">
                        Your rights
                    </Heading>
                    <Text>
                        Depending on the processing, you can ask us for access,
                        correction, deletion, restriction or data portability,
                        object to processing, or withdraw consent for future
                        processing. You also have the right to complain to a
                        data protection authority, including the{' '}
                        <Link
                            href="https://www.baden-wuerttemberg.datenschutz.de/beschwerde/"
                            isExternal
                            textDecoration="underline"
                        >
                            Baden-Württemberg data protection authority
                        </Link>
                        .
                    </Text>
                </Stack>
            </Stack>
            <Stack as="footer" spacing={2}>
                <LegalLinks />
            </Stack>
        </Stack>
    </Container>
);

// The notice is available independently of GROW Connect and its backend.
Privacy.getLayout = (page) => page;

export default Privacy;
