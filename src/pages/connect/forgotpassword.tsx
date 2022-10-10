import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import LoginLayout from 'layouts/LoginLayout';
import Image from 'next/image';
import { FormEventHandler, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const ForgotPassword: NextPageWithLayout = () => {
    const [email, setEmail] = useState('');
    const [reset, setReset] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!email) {
            return;
        }
        setLoading(true);
        await supabaseClient.auth.api.resetPasswordForEmail(email, {
            redirectTo: '/connect/resetpassword',
        });
        setReset(true);
    };
    return (
        <VStack gap={2} alignItems="stretch">
            <Image
                alt="Grow Logo"
                src="/images/GROW.png"
                layout="fixed"
                width={128}
                height={27}
            />
            {reset ? (
                <Alert status="success">
                    <AlertIcon />
                    An email to reset your password was sent to {email}
                </Alert>
            ) : (
                <form onSubmit={onSubmit}>
                    <VStack alignItems="stretch">
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" isLoading={isLoading}>
                            Reset Password
                        </Button>
                    </VStack>
                </form>
            )}
        </VStack>
    );
};

ForgotPassword.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default ForgotPassword;
