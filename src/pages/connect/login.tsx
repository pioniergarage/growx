import LogInForm from '@/components/forms/logInForm';
import LoginLayout from '@/components/layouts/LoginLayout';
import PageLink from '@/components/nav/PageLink';
import { Alert, AlertIcon, Box, Heading, VStack } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'types';

const LoginPage: NextPageWithLayout = () => {
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/connect/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleLogin({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        setLoading(true);
        setLoginError('');
        const { error } = await supabaseClient.auth.signIn({ email, password });
        if (error) {
            setLoginError(error.message);
        }
        router.replace('/connect/');
        setLoading(false);
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
            <LogInForm onSubmit={handleLogin} loading={loading} />
            {loginError ? (
                <Alert status="error" width="16rem">
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
