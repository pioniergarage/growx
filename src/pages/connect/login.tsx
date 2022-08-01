import LogInForm from '@/components/forms/logInForm';
import LoginLayout from '@/components/layouts/LoginLayout';
import PageLink from '@/components/nav/link';
import { Alert, AlertIcon, Box, Heading, VStack } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'types';

const LoginPage: NextPageWithLayout = () => {
    const [loginError, setLoginError] = useState('');
    const router = useRouter();

    if (supabaseClient.auth.user()) {
        router.replace('/connect/')
    }

    async function handleLogin({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        const { error } = await supabaseClient.auth.signIn({ email, password });
        if (error) {
            setLoginError(error.message);
            return;
        }
        router.replace('/connect/');
    }
    return (
        <VStack gap={2}>
            <Box>
                <Heading as="h1" size="xl" color="secondary">
                    GROWconnect
                </Heading>
                <Heading as="h3" size="sm" fontWeight="light">
                    the platform for participants
                </Heading>
            </Box>
            <LogInForm onSubmit={handleLogin} />
            {loginError ? (
                <Alert status="error" width='16rem'>
                    <AlertIcon />
                    {loginError}
                </Alert>
            ) : undefined}
            <PageLink color="primary" textAlign="center" href="/connect/signup">
                Don&apos;t have an account yet? <br />
                Click here to sign up.
            </PageLink>
        </VStack>
    );
};
LoginPage.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default LoginPage;
