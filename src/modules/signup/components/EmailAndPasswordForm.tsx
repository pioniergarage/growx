import PageLink from '@/components/navigation/PageLink';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Text
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Image from "next/legacy/image";
import { useEffect } from 'react';
import rules from 'utils/rules';

export type SignUpInfo = {
    email: string;
    password: string;
};

type EmailAndPasswordFormProps = {
    initialEmail?: string;
    onNext: (info: SignUpInfo) => void;
    isLoading?: boolean;
    signUpAs?: string;
};

const EmailAndPasswordForm = ({
    initialEmail = '',
    onNext,
    isLoading = false,
    signUpAs,
}: EmailAndPasswordFormProps) => {
    const formik = useFormik<{
        email: string;
        password: string;
        passwordRepeat: string;
    }>({
        initialValues: {
            email: initialEmail,
            password: '',
            passwordRepeat: '',
        },
        onSubmit: (values) => onNext(values),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.email) errors.email = 'Required';
            if (!values.password) errors.password = 'Required';
            if (values.password !== values.passwordRepeat)
                errors.passwordRepeat = 'Does not match';
            const emailError = rules.email(values.email);
            if (emailError !== true) errors.email = emailError;
            const passwordError = rules.password(values.password);
            if (passwordError !== true) errors.password = passwordError;
            return errors;
        },
        validateOnChange: false,
    });

    useEffect(() => {
        if (initialEmail) {
            formik.setFieldValue('email', initialEmail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialEmail]);

    return (
        <form onSubmit={formik.handleSubmit} className='grid gap-10'>
            <div className='grid gap-5'>
                <Box textAlign="center">
                    <Box mb={2}>
                        <Image
                            alt="Grow Logo"
                            src="/images/GROW.png"
                            layout="fixed"
                            width={128}
                            height={27}
                        />
                    </Box>
                    <Heading size="md" lineHeight={0.8}>
                        Sign up
                    </Heading>
                    {signUpAs && (
                        <Text color="gray.400" mb={4}>
                            as {signUpAs}
                        </Text>
                    )}
                </Box>
                <Text fontSize="sm">
                    PionierGarage e.V. uses your information to set up your GROW
                    Connect account and organise GROW.{' '}
                    <Link href="/privacy#registration" isExternal textDecoration="underline">
                        GROW registration privacy notice
                    </Link>
                </Text>
                <FormControl
                    isInvalid={!!formik.errors.email}
                    isDisabled={isLoading}
                    isRequired
                >
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                        name="email"
                        id="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!formik.errors.password}
                    isDisabled={isLoading}
                    isRequired
                >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <FormErrorMessage>
                        {formik.errors.password}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!formik.errors.passwordRepeat}
                    isDisabled={isLoading}
                    isRequired
                >
                    <FormLabel htmlFor="passwordRepeat">
                        Repeat Password
                    </FormLabel>
                    <Input
                        type="password"
                        name="passwordRepeat"
                        id="passwordRepeat"
                        onChange={formik.handleChange}
                        value={formik.values.passwordRepeat}
                    />
                    <FormErrorMessage>
                        {formik.errors.passwordRepeat}
                    </FormErrorMessage>
                </FormControl>

                <Button
                    type="submit"
                    variant="solid"
                    width="100%"
                    isLoading={isLoading}
                >
                    Next
                </Button>
            </div>

            <PageLink href="/connect/login" color="primary" textAlign="center">
                Already signed up? Click here to login.
            </PageLink>
        </form>
    );
};

export default EmailAndPasswordForm;
