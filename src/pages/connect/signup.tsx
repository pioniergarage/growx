import ParticipateForm, {
    ParticipateInfo,
} from '@/components/forms/ParticipateForm';
import PageLink from '@/components/navigation/PageLink';
import { Alert, AlertIcon, Box, Heading, VStack } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useUpdateProfile } from 'hooks/profile';
import LoginLayout from 'layouts/LoginLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const SignUp: NextPageWithLayout = () => {
    const [loading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState<string>('');
    const router = useRouter();
    const { user } = useUser();
    const { updateProfile } = useUpdateProfile();

    useEffect(() => {
        if (user) {
            router.replace('/connect/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function signUp(info: ParticipateInfo) {
        return supabaseClient.auth
            .signUp({
                email: info.email,
                password: info.password,
            })
            .then(({ user, error }) => {
                if (error) throw error.message;
                if (!user) throw 'Could not create user';
                return { user, info };
            });
    }

    async function onSignUp(info: ParticipateInfo) {
        setLoading(true);
        await signUp(info)
            .then(({ user, info }) =>
                updateProfile({ ...info, userId: user.id })
            )
            .then(() => router.replace('/connect/welcome'))
            .catch((error) => setSignUpError(String(error)));
        setLoading(false);
    }
    return (
        <VStack maxW="container.sm" mx="auto" alignItems="stretch">
            <Box>
                <Heading as="h1" size="xl" color="secondary">
                    GROWconnect
                </Heading>
                <Heading as="h3" size="sm" fontWeight="light">
                    the platform for participants
                </Heading>
            </Box>
            <ParticipateForm loading={loading} onSubmit={onSignUp} />
            {signUpError ? (
                <Alert status="error">
                    <AlertIcon />
                    {signUpError}
                </Alert>
            ) : undefined}
            <PageLink href="/connect/login" color="primary" textAlign="center">
                Already signed up? Click here to login.
            </PageLink>
        </VStack>
    );
};

SignUp.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default SignUp;
