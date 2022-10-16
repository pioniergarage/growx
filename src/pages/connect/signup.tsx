import { Alert, AlertIcon, Spinner, Text, VStack } from '@chakra-ui/react';
import {
    getUser,
    supabaseClient,
    withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import LoginLayout from 'layouts/LoginLayout';
import {
    useInsertFurhterProfileInfo,
    useUpdateProfile,
} from 'modules/profile/hooks';
import EmailAndPasswordForm, {
    SignUpInfo,
} from 'modules/signup/components/EmailAndPasswordForm';
import FurtherInfo from 'modules/signup/components/FurtherInfo';
import PersonalInfoForm, {
    PersonalInfo,
} from 'modules/signup/components/PersonalInfoForm';
import StudentForm from 'modules/signup/components/StudentForm';
import UniversityForm from 'modules/signup/components/UniversityForm';
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
    const { insertFurtherProfileInfo } = useInsertFurhterProfileInfo();

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
                <EmailAndPasswordForm
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
                <FurtherInfo
                    onNext={(info) => {
                        setStep(step + 1);
                        insertFurtherProfileInfo({
                            ...info,
                            email: emailAndPassword.email,
                        });
                    }}
                />
            ) : step === 3 ? (
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
            ) : step === 4 ? (
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
            ) : step === 5 && !signUpError ? (
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
