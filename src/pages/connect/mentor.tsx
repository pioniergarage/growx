import rules from '@/components/forms/rules';
import TagSelect from '@/components/TagSelect';
import {
    Alert,
    AlertIcon,
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
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useFormik } from 'formik';
import { useUpdateProfile } from 'hooks/profile';
import LoginLayout from 'layouts/LoginLayout';
import { availableSkills, Gender } from 'model';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const SelectSkills = ({
    onContinue,
    isLoading,
}: {
    onContinue: (skills: string[]) => void;
    isLoading: boolean;
}) => {
    const [skills, setSkills] = useState<string[]>(['Social Entrepreneurship']);
    return (
        <Box minW="20rem">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onContinue(skills);
                }}
            >
                <Heading size="md">Skills</Heading>
                <Text color="gray.400" mb={4}>
                    You can adjust these later
                </Text>
                <FormControl>
                    <TagSelect
                        values={availableSkills}
                        selected={skills}
                        onDeselect={(v) => {
                            const newSkills = [...skills];
                            newSkills.splice(skills.indexOf(v), 1);
                            setSkills(newSkills);
                        }}
                        onSelect={(v) => {
                            setSkills([...skills, v]);
                        }}
                    />
                </FormControl>
                <Button
                    type="submit"
                    variant="solid"
                    width="100%"
                    mt={10}
                    isLoading={isLoading}
                >
                    Continue
                </Button>
            </form>
        </Box>
    );
};

type PersonalInfo = {
    firstName: string;
    lastName: string;
    gender: Gender;
    phone: string;
};

const PersonalInfoForm = ({
    onNext,
    initialFirstName = '',
    initialLastName = '',
    initialGender = 'OTHER',
    isLoading,
}: {
    onNext: (info: PersonalInfo) => void;
    initialFirstName?: string;
    initialLastName?: string;
    initialGender?: Gender;
    isLoading: boolean;
}) => {
    const formik = useFormik<PersonalInfo>({
        initialValues: {
            firstName: initialFirstName,
            lastName: initialLastName,
            gender: initialGender,
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
            <Heading size="md">Personal Information</Heading>
            <VStack gap={2} alignItems="stretch">
                <Text color="gray.400">
                    You can change this information later
                </Text>
                <FormControl
                    isInvalid={!!formik.errors.firstName}
                    isDisabled={isLoading}
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
                    isInvalid={!!formik.errors.lastName}
                    isDisabled={isLoading}
                >
                    <FormLabel htmlFor="lastName">Last name*</FormLabel>
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
                    <RadioGroup defaultValue={'OTHER'}>
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

type SignUpInfo = {
    email: string;
    password: string;
};

const MentorNameAndPassword = ({
    initialEmail = '',
    onNext,
    isLoading,
}: {
    initialEmail?: string;
    onNext: (info: SignUpInfo) => void;
    isLoading: boolean;
}) => {
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

    return (
        <>
            <Box>
                <Heading as="h1" size="xl" color="secondary">
                    GROW
                </Heading>
                <Heading as="h3" size="sm">
                    Sign up as mentor
                </Heading>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <VStack gap={2} alignItems="stretch">
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
                        <FormErrorMessage>
                            {formik.errors.email}
                        </FormErrorMessage>
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
        </>
    );
};

const MentorSignUp: NextPageWithLayout = () => {
    const [userId, setUserId] = useState('');
    const [step, setStep] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState<string>('');
    const { updateProfile } = useUpdateProfile();
    const router = useRouter();

    async function onSignUp(info: SignUpInfo) {
        setLoading(true);
        await supabaseClient.auth
            .signUp({
                email: info.email,
                password: info.password,
            })
            .then(({ user, error }) => {
                if (error) throw error.message;
                if (!user) throw 'Could not create user';
                return user;
            })
            .then((user) => {
                updateProfile({ ...info, userId: user.id, role: 'MENTOR' });
                setUserId(user.id);
                setStep(step + 1);
            })
            .catch((error) => setSignUpError(String(error)));
        setLoading(false);
    }

    async function setPersonalInfo(info: PersonalInfo) {
        setLoading(true);
        await updateProfile({ ...info, userId });
        setStep(step + 1);
        setLoading(false);
    }

    async function setSkills(skills: string[]) {
        setLoading(true);
        await updateProfile({ skills, userId });
        router.push('/connect');
        setLoading(false);
    }

    return (
        <VStack maxW="container.sm" mx="auto" alignItems="stretch">
            {step == 0 ? (
                <>
                    <MentorNameAndPassword
                        onNext={onSignUp}
                        isLoading={isLoading}
                    />
                    {signUpError ? (
                        <Alert status="error">
                            <AlertIcon />
                            {signUpError}
                        </Alert>
                    ) : undefined}
                </>
            ) : step == 1 ? (
                <PersonalInfoForm
                    onNext={(info) => setPersonalInfo(info)}
                    isLoading={isLoading}
                />
            ) : step == 2 ? (
                <SelectSkills
                    onContinue={(skills) => setSkills(skills)}
                    isLoading={isLoading}
                />
            ) : undefined}
        </VStack>
    );
};

MentorSignUp.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default MentorSignUp;
