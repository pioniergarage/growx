import PageLink from '@/components/navigation/PageLink';
import { Alert, AlertIcon, Flex, Spacer, VStack } from '@chakra-ui/react';
import { withPageAuth } from 'utils/supabase/withPageAuth';

import { useSupabaseClient } from '@/components/providers/SupabaseProvider';
import { getEvents } from 'modules/events/api';
import LoginLayout from 'layouts/LoginLayout';
import LogInForm from 'modules/signup/components/LoginForm';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

interface LoginPageProps {
    signupLink: string | null;
}

const LoginPage: NextPageWithLayout<LoginPageProps> = ({ signupLink }) => {
    const supabaseClient = useSupabaseClient();
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        setLoading(true);
        setLoginError('');
        const { error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setLoginError(error.message);
            setLoading(false);
        } else {
            router.replace('/connect/');
        }
    }
    return (
        <VStack gap={2} alignItems="stretch">
            <Image
                alt="Grow Logo"
                src="/images/GROW.png"
                layout="fixed"
                width={128}
                height={27}
            />
            <Spacer></Spacer>
            <LogInForm onSubmit={handleLogin} loading={loading} />
            {loginError && (
                <Alert status="error" width="16rem">
                    <AlertIcon />
                    {loginError}
                </Alert>
            )}
            <Flex flexDir="column">
                <PageLink
                    color="primary"
                    textAlign="center"
                    href="/connect/forgotpassword"
                >
                    Forgot your password?
                </PageLink>
            </Flex>
            <Spacer />
            {signupLink ? (
                <PageLink color="primary" textAlign="center" href={signupLink}>
                    Want to participate? Sign up now!
                </PageLink>
            ) : (
                <PageLink
                    color="primary"
                    textAlign="center"
                    href="mailto:vorstand@pioniergarage.de"
                >
                    Want to participate? Missed the kickoff? Email us!
                </PageLink>
            )}

        </VStack >
    );
};
LoginPage.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default LoginPage;

export const getServerSideProps = withPageAuth({
    authRequired: false,
    getServerSideProps: async (context, supabase) => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            throw error;
        }

        if (data.session) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/connect',
                },
            };
        }

        // Between kickoff and midterm, show a direct link to the sign up page.
        // The token is only sent to the client inside this window.
        let signupLink: string | null = null;
        // The token is optional: without SIGNUP_SECRET_TOKEN the sign up page is open.
        const token = process.env.SIGNUP_SECRET_TOKEN;
        try {
            const events = await getEvents(supabase);
            const kickoff = events.find((e) => e.ref === 'kickoff');
            const midterm = events.find((e) => e.ref === 'midterm');
            const now = new Date();
            if (kickoff && midterm && kickoff.date <= now && now <= midterm.date) {
                signupLink = token
                    ? `/connect/signup?t=${encodeURIComponent(token)}`
                    : '/connect/signup';
            }
        } catch (e) {
            console.error('Could not load events for sign up link', e);
        }
        return { props: { signupLink } };
    },
});
