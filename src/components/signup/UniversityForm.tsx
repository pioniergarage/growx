import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

export const kitName = 'Karlsruhe Institute of Technology';
const kitCountry = 'Germany';

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
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack alignItems="stretch" gap={2}>
                <Heading size="sm">Where do you study?</Heading>
                <VStack alignItems="stretch">
                    <Checkbox
                        id="atKIT"
                        isChecked={formik.values.atKIT}
                        onChange={(e) => {
                            formik.setFieldValue('atKIT', e.target.checked);
                            if (e.target.checked) {
                                formik.setFieldValue('university', kitName);
                                formik.setFieldValue('country', kitCountry);
                            }
                        }}
                    >
                        {kitName}
                    </Checkbox>
                    <FormControl isInvalid={!!formik.errors.university}>
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
                    <FormControl isInvalid={!!formik.errors.country}>
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
                    {formik.values.atKIT ? (
                        <FormControl>
                            <FormLabel mt={4}>KIT students only</FormLabel>
                            <Checkbox
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        'isSQ',
                                        e.target.checked
                                    )
                                }
                                isChecked={formik.values.isSQ}
                            >
                                Binding registration as key and
                                interdisciplinary qualifications. <br /> More
                                info: &nbsp;
                                <Link
                                    href="https://www.hoc.kit.edu/startupdiploma.php"
                                    isExternal
                                >
                                    HoC <ExternalLinkIcon mx="2px" />
                                </Link>
                            </Checkbox>
                        </FormControl>
                    ) : undefined}
                </VStack>
                <Button type="submit">Next</Button>
            </VStack>
        </form>
    );
};
export default UniversityForm;
