import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FurtherProfileInfo } from 'model';

type FurtherInfoProps = {
    onNext: (info: FurtherProfileInfo) => void;
};

const FurtherInfo = ({ onNext }: FurtherInfoProps) => {
    const formik = useFormik({
        initialValues: {
            lookingForTeam: undefined,
            idea: '',
            expectations: '',
            source: '',
        },
        onSubmit: ({ lookingForTeam, idea, expectations, source }) => {
            if (lookingForTeam === undefined) {
                return;
            }
            onNext({ lookingForTeam, idea, expectations, source });
        },
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (values.lookingForTeam === undefined) {
                errors.lookingForteam = 'Required';
            }
            return errors;
        },
        validateOnChange: false,
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack gap={2} alignItems="center">
                <Box textAlign="center">
                    <Heading size="md">Further Information</Heading>
                </Box>
                <FormControl
                    isInvalid={!!formik.errors.lookingForTeam}
                    isRequired
                >
                    <FormLabel htmlFor="lookingForTeam">
                        Do you already have a team?
                    </FormLabel>
                    <RadioGroup as={Flex} gap={4}>
                        <Radio
                            onChange={(e) =>
                                formik.setFieldValue(
                                    'lookingForTeam',
                                    e.target.checked
                                )
                            }
                            isChecked={formik.values.lookingForTeam}
                        >
                            Yes
                        </Radio>
                        <Radio
                            onChange={(e) =>
                                formik.setFieldValue(
                                    'lookingForTeam',
                                    !e.target.checked
                                )
                            }
                            isChecked={formik.values.lookingForTeam === false}
                        >
                            No
                        </Radio>
                    </RadioGroup>
                    <FormErrorMessage>
                        {formik.errors.lookingForTeam}
                    </FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="idea">
                        Do you already have an idea? If so, please describe it
                        in 3 sentences.
                    </FormLabel>
                    <Textarea
                        id="idea"
                        onChange={formik.handleChange}
                        placeholder="We have an idea to save the world..."
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="expectations">
                        What are your expectations of GROW?
                    </FormLabel>
                    <Input id="expectations" onChange={formik.handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="source">
                        How did you find out about GROW?
                    </FormLabel>
                    <Input id="source" onChange={formik.handleChange} />
                </FormControl>
                <Button type="submit" variant="solid" width="100%">
                    Next
                </Button>
            </VStack>
        </form>
    );
};

export default FurtherInfo;
