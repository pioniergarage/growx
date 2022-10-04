import ParticipateForm, {
    ParticipateInfo,
} from '@/components/forms/ParticipateForm';
import PageLink from '@/components/navigation/PageLink';
import { Alert, AlertIcon, Heading, VStack } from '@chakra-ui/react';
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
        const { user, error } = await supabaseClient.auth.signUp({
            email: info.email,
            password: info.password,
        });
        if (error) throw error.message;
        if (!user) throw 'Could not create user';
        return user;
    }

    async function onSignUp(info: ParticipateInfo) {
        setLoading(true);
        try {
            const user = await signUp(info);
            await updateProfile({ ...info, userId: user.id });
            router.replace('/connect');
        } catch (error) {
            setSignUpError((error as Error).message);
        }
        setLoading(false);
    }
    return (
        <VStack maxW="container.sm" mx="auto" alignItems="stretch">
            <Heading as="h1" size="xl" color="secondary">
                GROW
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
};

SignUp.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default SignUp;
