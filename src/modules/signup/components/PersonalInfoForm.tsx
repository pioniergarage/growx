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
import { PersonalInfo } from '../types';

type PersonalInfoFormProps = {
    onNext: (info: PersonalInfo) => void;
    initialInfo?: Partial<PersonalInfo>;
    isLoading?: boolean;
};

const PersonalInfoForm = ({
    onNext,
    initialInfo = {},
    isLoading = false,
}: PersonalInfoFormProps) => {
    const formik = useFormik<PersonalInfo>({
        initialValues: {
            forename: initialInfo.forename ?? '',
            surname: initialInfo.surname ?? '',
            gender: initialInfo.gender ?? 'OTHER',
            phone: '',
            country: '',
        },
        onSubmit: (values) => onNext(values),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.forename) errors.forename = 'Required';
            if (!values.surname) errors.surname = 'Required';
            if (!values.country) errors.country = 'Required';
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
                    isInvalid={!!formik.errors.forename}
                    isDisabled={isLoading}
                    isRequired
                >
                    <FormLabel htmlFor="forename">Forename</FormLabel>
                    <Input
                        name="forename"
                        id="forename"
                        onChange={formik.handleChange}
                        value={formik.values.forename}
                    />
                    <FormErrorMessage>
                        {formik.errors.forename}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!formik.errors.surname}
                    isDisabled={isLoading}
                    isRequired
                >
                    <FormLabel htmlFor="surname">Surname</FormLabel>
                    <Input
                        type="surname"
                        name="surname"
                        id="surname"
                        onChange={formik.handleChange}
                        value={formik.values.surname}
                    />
                    <FormErrorMessage>{formik.errors.surname}</FormErrorMessage>
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
                    isInvalid={!!formik.errors.country}
                    isRequired
                >
                    <FormLabel>Country</FormLabel>
                    <Input
                        name="country"
                        id="country"
                        onChange={formik.handleChange}
                        value={formik.values.country}
                    />
                    <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
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
