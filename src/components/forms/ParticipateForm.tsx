import rules from '@/components/forms/rules';
import {
    SimpleGrid,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Input,
    HStack,
    RadioGroup,
    Radio,
    GridItem,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Gender } from 'model';
import { useState } from 'react';

export type ParticipateInfo = {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    phone: string;
    studies: string;
    university: string;
    homeland: string;
    password: string;
};

export default function ParticipateForm({
    onSubmit,
    loading,
}: {
    onSubmit: (value: ParticipateInfo) => void;
    loading: boolean;
}) {
    const [validateOnChange, setValidateOnChange] = useState(false);
    const formik = useFormik<ParticipateInfo & { passwordRepeat: string }>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: 'OTHER',
            phone: '',
            studies: '',
            university: '',
            homeland: '',
            password: '',
            passwordRepeat: '',
        },
        onSubmit: (values) => onSubmit(values),
        validate: (values) => {
            setValidateOnChange(true);
            const errors: Record<string, string> = {};
            if (!values.firstName) errors.firstName = 'Required';
            if (!values.lastName) errors.lastName = 'Required';
            if (!values.email) errors.email = 'Required';
            if (!values.password) errors.password = 'Required';
            if (values.password !== values.passwordRepeat)
                errors.passwordRepeat = 'Does not match';
            const emailError = rules.email(values.email);
            if (emailError !== true) errors.email = emailError;
            return errors;
        },
        validateOnChange: validateOnChange,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack gap={4} alignItems="stretch">
                <SimpleGrid columns={2} gap={4}>
                    <GridItem colSpan={2}>
                        <FormControl
                            isDisabled={loading}
                            isInvalid={!!formik.errors.email}
                        >
                            <FormLabel htmlFor="email">
                                Email address*
                            </FormLabel>
                            <Input
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <FormErrorMessage>
                                {formik.errors.email}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <FormControl
                        isDisabled={loading}
                        isInvalid={!!formik.errors.password}
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
                        isDisabled={loading}
                        isInvalid={!!formik.errors.passwordRepeat}
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
                    <FormControl
                        isDisabled={loading}
                        isInvalid={!!formik.errors.firstName}
                    >
                        <FormLabel htmlFor="firstName">First name*</FormLabel>
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
                        isDisabled={loading}
                        isInvalid={!!formik.errors.lastName}
                    >
                        <FormLabel htmlFor="lastName">Last name*</FormLabel>
                        <Input
                            name="lastName"
                            id="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        <FormErrorMessage>
                            {formik.errors.lastName}
                        </FormErrorMessage>
                    </FormControl>
                    <GridItem colSpan={2}>
                        <FormControl isDisabled={loading} as="fieldset">
                            <FormLabel as="legend">Gender</FormLabel>
                            <RadioGroup defaultValue="other">
                                <HStack spacing="24px">
                                    <Radio
                                        value="male"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'MALE'
                                        }
                                        onChange={formik.handleChange}
                                    >
                                        Male
                                    </Radio>
                                    <Radio
                                        value="female"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'FEMALE'
                                        }
                                        onChange={formik.handleChange}
                                    >
                                        Female
                                    </Radio>
                                    <Radio
                                        value="other"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'OTHER'
                                        }
                                        onChange={formik.handleChange}
                                    >
                                        Other
                                    </Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                    </GridItem>
                    <FormControl isDisabled={loading}>
                        <FormLabel>Phone number</FormLabel>
                        <Input
                            name="phone"
                            id="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>Course of studies</FormLabel>
                        <Input
                            name="studies"
                            id="studies"
                            onChange={formik.handleChange}
                            value={formik.values.studies}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>University</FormLabel>
                        <Input
                            id="university"
                            name="university"
                            onChange={formik.handleChange}
                            value={formik.values.university}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>Homeland</FormLabel>
                        <Input
                            name="homeland"
                            id="homeland"
                            onChange={formik.handleChange}
                            value={formik.values.homeland}
                        />
                    </FormControl>
                </SimpleGrid>

                <Button
                    type="submit"
                    variant="solid"
                    width="100%"
                    isLoading={loading}
                >
                    Sign Up
                </Button>
            </VStack>
        </form>
    );
}
