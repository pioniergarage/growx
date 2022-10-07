import NameAndPasswordForm, {
    SignUpInfo,
} from '@/components/signup/EmailAndPasswordForm';
import PersonalInfoForm, {
    PersonalInfo,
} from '@/components/signup/PersonalInfoForm';
import StudentForm from '@/components/signup/StudentForm';
import UniversityForm from '@/components/signup/UniversityForm';
import { Alert, AlertIcon, Spinner, Text, VStack } from '@chakra-ui/react';
import {
    getUser,
    supabaseClient,
    withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import { useUpdateProfile } from 'hooks/profile';
import LoginLayout from 'layouts/LoginLayout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const SignUp: NextPageWithLayout = () => {
    const [step, setStep] = useState(0);
    const [emailAndPassword, setEmailAndPassword] = useState<SignUpInfo>({
        email: '',
        password: '',
    });
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        firstName: '',
        lastName: '',
        gender: 'MALE',
        phone: '',
        homeland: '',
    });

    const [signUpError, setSignUpError] = useState<string>('');
    const router = useRouter();
    const { updateProfile } = useUpdateProfile();

    async function signUp({ email, password }: SignUpInfo) {
        const { user, error } = await supabaseClient.auth.signUp({
            email,
            password,
        });
        if (error) throw error.message;
        if (!user) throw 'Could not create user';
        return user;
    }

    async function createAccount(
        emailAndPassword: SignUpInfo,
        personalInfo: PersonalInfo,
        isSQ: boolean,
        university?: string,
        universityCountry?: string
    ) {
        try {
            const user = await signUp(emailAndPassword);
            await updateProfile({
                email: emailAndPassword.email,
                ...personalInfo,
                userId: user.id,
                university,
                universityCountry,
                keyQualification: isSQ,
            });
            router.replace('/connect');
        } catch (error) {
            setStep(0);
            setSignUpError(error as string);
        }
    }
    return (
        <VStack maxW="container.sm" mx="auto" alignItems="stretch">
            {step === 0 ? (
                <NameAndPasswordForm
                    onNext={(info) => {
                        setEmailAndPassword(info);
                        setStep(step + 1);
                    }}
                />
            ) : step == 1 ? (
                <PersonalInfoForm
                    onNext={(info) => {
                        setPersonalInfo(info);
                        setStep(step + 1);
                    }}
                />
            ) : step === 2 ? (
                <StudentForm
                    onNext={(isStudent) => {
                        if (isStudent) {
                            setStep(step + 1);
                        } else {
                            setStep(step + 2);
                            createAccount(
                                emailAndPassword,
                                personalInfo,
                                false,
                                undefined,
                                undefined
                            );
                        }
                    }}
                />
            ) : step === 3 ? (
                <UniversityForm
                    onNext={({ university, country, isSQ }) => {
                        setStep(step + 1);
                        createAccount(
                            emailAndPassword,
                            personalInfo,
                            isSQ,
                            university,
                            country
                        );
                    }}
                />
            ) : step === 4 && !signUpError ? (
                <VStack>
                    <Text color="gray.400">Creating account</Text>
                    <Spinner />
                </VStack>
            ) : undefined}
            {signUpError ? (
                <Alert status="error">
                    <AlertIcon />
                    {signUpError}
                </Alert>
            ) : undefined}
        </VStack>
    );
};

SignUp.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default SignUp;

export const getServerSideProps = withPageAuth({
    authRequired: false,
    getServerSideProps: async (context) => {
        const { user } = await getUser(context);
        if (user) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/connect',
                },
            };
        } else {
            return { props: {} };
        }
    },
});
