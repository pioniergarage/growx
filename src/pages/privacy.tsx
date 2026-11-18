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
                    <Heading as="h2" size="md">Who runs GROW</Heading>
                    <Text>
                        PionierGarage e.V., Straße am Forum 1, 76131 Karlsruhe, Germany.
                        You can contact us about GROW and your data at{' '}
                        <Link href="mailto:grow@pioniergarage.de" textDecoration="underline">
                            grow@pioniergarage.de
                        </Link>.
                    </Text>
                </Stack>
                <Stack as="section" id="registration" spacing={2}>
                    <Heading as="h2" size="md">Registration and GROW Connect</Heading>
                    <Text>
                        We use your email address and password to create and secure your
                        account. We use the details you provide, such as your name, country,
                        gender and phone number, to set up your profile and organise your
                        participation. Depending on your role, we may ask for student and
                        university details, information about your skills, or a short biography.
                    </Text>
                    <Text>
                        During participant registration, we ask whether you have a team and
                        invite you to share your startup idea, expectations and how you heard
                        about GROW. When you continue from that step, we save your answers
                        with your email address, even if you leave before creating an account.
                        Please avoid including other people’s personal data in your answers.
                    </Text>
                    <Text>
                        GROW Connect uses Supabase for authentication and to store these records.
                        We use your email address to send a password reset link when you request
                        one. Session cookies keep you signed in.
                    </Text>
                </Stack>
                <Stack as="section" spacing={2}>
                    <Heading as="h2" size="md">Site analytics and external videos</Heading>
                    <Text>
                        With your permission, we use Google Analytics on the public site to
                        understand visits and interactions. Google receives information about
                        your visit and browser and may store analytics identifiers on your device.
                    </Text>
                    <Text>
                        If you allow external media, embedded YouTube videos connect to Google
                        and may access information on your device. You can change either choice
                        using Cookie settings below. Your browser remembers these choices.
                    </Text>
                </Stack>
                <Stack as="section" spacing={2}>
                    <Heading as="h2" size="md">Your rights</Heading>
                    <Text>
                        You can contact us to ask for access, correction, deletion or restriction,
                        object to applicable processing, request a copy of portable data or
                        withdraw consent. You also have the right to complain to a data protection
                        authority, including the{' '}
                        <Link href="https://www.baden-wuerttemberg.datenschutz.de/" isExternal textDecoration="underline">
                            Baden-Württemberg data protection authority
                        </Link>.
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
