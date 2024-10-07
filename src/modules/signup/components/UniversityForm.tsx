import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

export const kitName = 'Karlsruhe Institute of Technology';
export const kitCountry = 'Germany';

type UniversityFormProps = {
    onNext: (info: {
        university: string;
        country: string;
        isSQ: boolean;
    }) => void;
};

const UniversityForm = ({ onNext }: UniversityFormProps) => {
    const formik = useFormik({
        initialValues: {
            atKIT: false,
            university: '',
            country: '',
            isSQ: false,
        },
        onSubmit: ({ university, country, isSQ, atKIT }) => {
            onNext({ university, country, isSQ: isSQ && atKIT });
        },
        validate: ({ university, country }) => {
            const errors: Record<string, string> = {};
            if (!university) errors.university = 'Required';
            if (!country) errors.country = 'Required';
            return errors;
        },
        validateOnChange: false,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack alignItems="stretch" gap={2}>
                <Heading size="sm">Where do you study?</Heading>
                <VStack alignItems="stretch">
                    <RadioGroup>
                        <Flex flexDir="column" gap={2}>
                            <Radio
                                id="atKIT"
                                isChecked={formik.values.atKIT}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        formik.setFieldValue(
                                            'university',
                                            kitName
                                        );
                                        formik.setFieldValue(
                                            'country',
                                            kitCountry
                                        );
                                    }
                                    formik.setFieldValue(
                                        'atKIT',
                                        e.target.checked
                                    );
                                }}
                            >
                                {kitName}
                            </Radio>
                            <Radio
                                isChecked={!formik.values.atKIT}
                                onChange={(e) => {
                                    formik.setFieldValue(
                                        'atKIT',
                                        !e.target.checked
                                    );
                                }}
                            >
                                Other
                            </Radio>
                        </Flex>
                    </RadioGroup>
                    <FormControl
                        isInvalid={!!formik.errors.university}
                        isRequired
                    >
                        <FormLabel>University</FormLabel>
                        <Input
                            value={formik.values.university}
                            onChange={(e) =>
                                formik.setFieldValue(
                                    'university',
                                    e.target.value
                                )
                            }
                            disabled={formik.values.atKIT}
                        />

                        <FormErrorMessage>
                            {formik.errors.university}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.country} isRequired>
                        <FormLabel>Country</FormLabel>
                        <Input
                            value={formik.values.country}
                            onChange={(e) =>
                                formik.setFieldValue('country', e.target.value)
                            }
                            disabled={formik.values.atKIT}
                        />

                        <FormErrorMessage>
                            {formik.errors.country}
                        </FormErrorMessage>
                    </FormControl>
                </VStack>
                <Button type="submit">Next</Button>
            </VStack>
        </form>
    );
};
export default UniversityForm;
