import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect } from 'react';
import rules from '../forms/rules';
import PageLink from '../navigation/PageLink';

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
        agreement: boolean;
    }>({
        initialValues: {
            email: initialEmail,
            password: '',
            passwordRepeat: '',
            agreement: false,
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
            if (!values.agreement) errors.agreement = 'Required';
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
        <form onSubmit={formik.handleSubmit}>
            <VStack alignItems="center">
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
                    {signUpAs ? (
                        <Text color="gray.400" mb={4}>
                            as {signUpAs}
                        </Text>
                    ) : undefined}
                </Box>
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
                <FormControl isRequired isInvalid={!!formik.errors.agreement}>
                    <Checkbox lineHeight={1.2}>
                        I agree to the&nbsp;
                        <Link
                            href="https://pioniergarage.de/datenschutzerklaerung"
                            isExternal
                        >
                            Pioniergarage Terms <ExternalLinkIcon mx="2px" />
                        </Link>{' '}
                        and that photos and videos of me may be published on the
                        internet
                    </Checkbox>
                    <FormErrorMessage>
                        {formik.errors.agreement}
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
            </VStack>

            <PageLink href="/connect/login" color="primary" textAlign="center">
                Already signed up? Click here to login.
            </PageLink>
        </form>
    );
};

export default EmailAndPasswordForm;
