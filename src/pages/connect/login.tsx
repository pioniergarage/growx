import LogInForm from '@/components/forms/LoginForm';
import PageLink from '@/components/navigation/PageLink';
import { Alert, AlertIcon, VStack } from '@chakra-ui/react';
import {
    getUser,
    supabaseClient,
    withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import LoginLayout from 'layouts/LoginLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const LoginPage: NextPageWithLayout = () => {
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
        const { error } = await supabaseClient.auth.signIn({ email, password });
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
            <PageLink color="primary" textAlign="center" href="/connect/signup">
                Don&apos;t have an account yet? <br />
                Click here to sign up.
            </PageLink>
        </VStack>
    );
};
LoginPage.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default LoginPage;

export const getServerSideProps = withPageAuth({
    authRequired: false,
    getServerSideProps: async (context) => {
        const { user } = await getUser(context);
        if (user) {
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
