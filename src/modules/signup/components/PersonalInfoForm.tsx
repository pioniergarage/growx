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

export type PersonalInfo = {
    firstName: string;
    lastName: string;
    phone: string;
};

type PersonalInfoFormProps = {
    onNext: (info: PersonalInfo) => void;
    initialFirstName?: string;
    initialLastName?: string;
    isLoading?: boolean;
};

const PersonalInfoForm = ({
    onNext,
    initialFirstName = '',
    initialLastName = '',
    isLoading = false,
}: PersonalInfoFormProps) => {
    const formik = useFormik<PersonalInfo>({
        initialValues: {
            firstName: initialFirstName,
            lastName: initialLastName,
            phone: '',
        },
        onSubmit: (values) => onNext(values),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.firstName) errors.firstName = 'Required';
            if (!values.lastName) errors.lastName = 'Required';
            return errors;
        },
        validateOnChange: false,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack gap={2} alignItems="center">
                <Box textAlign="center">
                    <Heading size="md">Personal Information</Heading>
                    <Text color="gray.400">
                        You can change this information later
                    </Text>
                </Box>
                <FormControl
                    isInvalid={!!formik.errors.firstName}
                    isDisabled={isLoading}
                    isRequired
                >
                    <FormLabel htmlFor="firstName">First name</FormLabel>
                    <Input
                        name="firstName"
                        id="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    <FormErrorMessage>
                        {formik.errors.firstName}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!formik.errors.lastName}
                    isDisabled={isLoading}
                    isRequired
                >
                    <FormLabel htmlFor="lastName">Last name</FormLabel>
                    <Input
                        type="lastName"
                        name="lastName"
                        id="lastName"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    <FormErrorMessage>
                        {formik.errors.lastName}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isDisabled={isLoading}>
                    <FormLabel>Phone number</FormLabel>
                    <Input
                        name="phone"
                        id="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
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

export default PersonalInfoForm;
