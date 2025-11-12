import { useSupabaseClient } from '@/components/providers/SupabaseProvider';
import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import LoginLayout from 'layouts/LoginLayout';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import { useState } from 'react';
import rules from 'utils/rules';
import { NextPageWithLayout } from 'utils/types';

const ResetPassword: NextPageWithLayout = () => {
    const supabaseClient = useSupabaseClient();
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordRepeat: '',
        },
        onSubmit: async ({ password }) => {
            setLoading(true);
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.replace('#', ''));
            const code = params.get('code');

            if (code) {
                supabaseClient.auth.exchangeCodeForSession(code);
            }
            const { error } = await supabaseClient.auth.updateUser({ password });

            if (error) {
                setError(error.message);
            } else {
                router.push('/connect/login');
            }
            setLoading(false);
        },
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.password) errors.password = 'Required';
            const passwordError = rules.password(values.password);
            if (passwordError !== true) {
                errors.password = passwordError;
            } else if (values.password !== values.passwordRepeat) {
                errors.passwordRepeat = 'Does not match';
            }
            return errors;
        },
        validateOnChange: false,
    });
    return (
        <VStack gap={2} alignItems="stretch">
            <Image
                alt="Grow Logo"
                src="/images/GROW.png"
                layout="fixed"
                width={128}
                height={27}
            />
            <form onSubmit={formik.handleSubmit}>
                <VStack alignItems="stretch">
                    <FormControl
                        isInvalid={!!formik.errors.password}
                        isRequired
                    >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <FormErrorMessage>
                            {formik.errors.password}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isInvalid={!!formik.errors.passwordRepeat}
                        isRequired
                    >
                        <FormLabel htmlFor="passwordRepeat">
                            Repeat Password
                        </FormLabel>
                        <Input
                            id="passwordRepeat"
                            type="password"
                            value={formik.values.passwordRepeat}
                            onChange={formik.handleChange}
                        />
                        <FormErrorMessage>
                            {formik.errors.passwordRepeat}
                        </FormErrorMessage>
                    </FormControl>
                    <Button type="submit" isLoading={isLoading}>
                        Update Password
                    </Button>
                </VStack>
            </form>
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            )}
        </VStack>
    );
};

ResetPassword.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default ResetPassword;
