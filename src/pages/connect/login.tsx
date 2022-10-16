import PageLink from '@/components/navigation/PageLink';
import { Alert, AlertIcon, Flex, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import LoginLayout from 'layouts/LoginLayout';
import LogInForm from 'modules/signup/components/LoginForm';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const LoginPage: NextPageWithLayout = () => {
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
            <LogInForm onSubmit={handleLogin} loading={loading} />
            {loginError ? (
                <Alert status="error" width="16rem">
                    <AlertIcon />
                    {loginError}
                </Alert>
            ) : undefined}
            <Flex flexDir="column">
                <PageLink
                    color="primary"
                    textAlign="center"
                    href="/connect/signup"
                >
                    Don&apos;t have an account yet? Click here to sign up.
                </PageLink>
                <PageLink
                    color="primary"
                    textAlign="center"
                    href="/connect/forgotpassword"
                >
                    Forgot your password?
                </PageLink>
            </Flex>
        </VStack>
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
        } else {
            return { props: {} };
        }
    },
});
