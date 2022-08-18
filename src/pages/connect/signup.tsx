import ParticipateForm, {
    ParticipateInfo,
} from '@/components/forms/ParticipateForm';
import LoginLayout from 'layouts/LoginLayout';
import PageLink from '@/components/navigation/PageLink';
import { VStack, Heading, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'types';
import { updateProfile } from 'api';

const SignUp: NextPageWithLayout = () => {
    const [loading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState<string>('');
    const router = useRouter();

    if (supabaseClient.auth.user()) {
        router.replace('/connect/')
    }

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
            .then(({user, info}) => updateProfile(user.id, {
                first_name: info.firstName,
                last_name: info.lastName,
                gender: info.gender,
                phone: info.phone,
                studies: info.studies,
                university: info.university,
                homeland: info.homeland,
                user_id: user.id,
                email: info.email
            }))
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
