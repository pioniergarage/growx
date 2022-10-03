import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import rules from '../forms/rules';

export type SignUpInfo = {
    email: string;
    password: string;
};

type EmailAndPasswordFormProps = {
    initialEmail?: string;
    onNext: (info: SignUpInfo) => void;
    isLoading?: boolean;
};

const EmailAndPasswordForm = ({
    initialEmail = '',
    onNext,
    isLoading = false,
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
            <VStack gap={2} alignItems="center">
                <Box textAlign="center">
                    <Heading size="md">Sign up</Heading>
                    <Text color="gray.400" mb={4}>
                        as mentor
                    </Text>
                </Box>
                <FormControl
                    isInvalid={!!formik.errors.email}
                    isDisabled={isLoading}
                >
                    <FormLabel htmlFor="email">Email address*</FormLabel>
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
                >
                    <FormLabel htmlFor="password">Password*</FormLabel>
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
            </VStack>
        </form>
    );
};

export default EmailAndPasswordForm;
