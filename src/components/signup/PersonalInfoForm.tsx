import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Gender } from 'model';

export type PersonalInfo = {
    firstName: string;
    lastName: string;
    gender: Gender;
    phone: string;
    homeland: string;
};

type PersonalInfoFormProps = {
    onNext: (info: PersonalInfo) => void;
    initialFirstName?: string;
    initialLastName?: string;
    initialGender?: Gender;
    isLoading?: boolean;
};

const PersonalInfoForm = ({
    onNext,
    initialFirstName = '',
    initialLastName = '',
    initialGender = 'OTHER',
    isLoading = false,
}: PersonalInfoFormProps) => {
    const formik = useFormik<PersonalInfo>({
        initialValues: {
            firstName: initialFirstName,
            lastName: initialLastName,
            gender: initialGender,
            phone: '',
            homeland: '',
        },
        onSubmit: (values) => onNext(values),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.firstName) errors.firstName = 'Required';
            if (!values.lastName) errors.lastName = 'Required';
            if (!values.homeland) errors.homeland = 'Required';
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
                <FormControl as="fieldset" isDisabled={isLoading}>
                    <FormLabel as="legend">Gender</FormLabel>
                    <RadioGroup>
                        <HStack spacing="24px">
                            <Radio
                                value="MALE"
                                name="gender"
                                isChecked={formik.values.gender === 'MALE'}
                                onChange={formik.handleChange}
                            >
                                Male
                            </Radio>
                            <Radio
                                value="FEMALE"
                                name="gender"
                                isChecked={formik.values.gender === 'FEMALE'}
                                onChange={formik.handleChange}
                            >
                                Female
                            </Radio>
                            <Radio
                                value="OTHER"
                                name="gender"
                                isChecked={formik.values.gender === 'OTHER'}
                                onChange={formik.handleChange}
                            >
                                Other
                            </Radio>
                        </HStack>
                    </RadioGroup>
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
                <FormControl
                    isDisabled={isLoading}
                    isInvalid={!!formik.errors.homeland}
                    isRequired
                >
                    <FormLabel>Country</FormLabel>
                    <Input
                        name="homeland"
                        id="homeland"
                        onChange={formik.handleChange}
                        value={formik.values.homeland}
                    />
                    <FormErrorMessage>
                        {formik.errors.homeland}
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

export default PersonalInfoForm;
