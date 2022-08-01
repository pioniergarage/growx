import ParticipateForm, {
    ParticipateInfo,
} from '@/components/forms/participateForm';
import PageLink from '@/components/nav/link';
import { VStack, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { supabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState<string>('');
    const router = useRouter();

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

    function buildProfile({
        user,
        info,
    }: {
        user: User;
        info: ParticipateInfo;
    }) {
        return supabaseClient
            .from('profiles')
            .update({
                first_name: info.firstName,
                last_name: info.lastName,
                gender: info.gender,
                phone: info.phone,
                studies: info.studies,
                university: info.university,
                homeland: info.homeland,
            })
            .eq('user_id', user.id);
    }

    async function onSignUp(info: ParticipateInfo) {
        setLoading(true);
        await signUp(info)
            .then(buildProfile)
            .then(() => router.replace('/connect/welcome'))
            .catch((error) => setSignUpError(String(error)));
        setLoading(false);
    }
    return (
        <VStack maxW="container.sm" mx="auto" alignItems="stretch">
            <Heading size={{ base: 'lg', md: 'xl' }} mb={4}>
                Sign Up
            </Heading>
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
}
