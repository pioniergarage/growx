import rules from '@/components/forms/rules';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Input,
    Link,
    SimpleGrid,
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
    password: string;
    keyQualification: boolean;
};

interface ParticipateFormProps {
    onSubmit: (value: ParticipateInfo) => void;
    loading: boolean;
}

const ParticipateForm: React.FC<ParticipateFormProps> = ({
    onSubmit,
    loading,
}) => {
    const [validateOnChange, setValidateOnChange] = useState(false);
    const formik = useFormik<ParticipateInfo & { passwordRepeat: string }>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: 'OTHER',
            password: '',
            passwordRepeat: '',
            keyQualification: false,
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
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <GridItem colSpan={{ base: 1, md: 2 }}>
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
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        {/* <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        For KIT students only:
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>
                                    <FormControl>
                                        <Checkbox>
                                            Join definitly with 2 ects as key
                                            qualification
                                        </Checkbox>
                                    </FormControl>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion> */}
                        <Divider />
                        <Box paddingTop="10px" pl="10px">
                            <Box flex="1" textAlign="left">
                                For KIT students only:
                            </Box>
                            <FormControl>
                                <Checkbox
                                    onChange={formik.handleChange}
                                    isChecked={formik.values.keyQualification}
                                >
                                    Use Grow as key qualification <br />
                                    (Gives 2 ects but makes the join binding,
                                    more info: &nbsp;
                                    <Link
                                        href="https://www.hoc.kit.edu/startupdiploma.php"
                                        isExternal
                                    >
                                        HoC <ExternalLinkIcon mx="2px" />
                                    </Link>
                                    )
                                </Checkbox>
                            </FormControl>
                        </Box>
                    </GridItem>
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
};

export default ParticipateForm;
