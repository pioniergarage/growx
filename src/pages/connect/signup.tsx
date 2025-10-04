import { Alert, AlertIcon, Spinner, Text, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import LoginLayout from 'layouts/LoginLayout';
import { useInsertContactInformation } from 'modules/contactInformation/hooks';
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
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

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

    const { updateProfile } = useUpdateProfile();
    const { insertFurtherProfileInfo } = useInsertFurhterProfileInfo();
    const { insertContactInformation } = useInsertContactInformation();

    async function signUp({ email, password }: SignUpInfo) {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
        });
        if (error) throw error.message;
        if (!data.user) throw 'Could not create user';
        return data.user;
    }

    async function createAccount(
        emailAndPassword: SignUpInfo,
        personalInfo: PersonalInfo,
        university?: string,
        universityCountry?: string
    ) {
        try {
            const user = await signUp(emailAndPassword);
            await insertContactInformation({
                userId: user.id,
                info: {
                    email: emailAndPassword.email,
                    phone: personalInfo.phone,
                },
            });
            await updateProfile({
                ...personalInfo,
                userId: user.id,
                university,
                universityCountry
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
                                undefined,
                                undefined
                            );
                        }
                    }}
                />
            ) : step === 4 ? (
                <UniversityForm
                    onNext={({ university, country }) => {
                        setStep(step + 1);
                        createAccount(
                            emailAndPassword,
                            personalInfo,
                            university,
                            country
                        );
                    }}
                />
            ) : (
                step === 5 &&
                !signUpError && (
                    <VStack>
                        <Text color="gray.400">Creating account</Text>
                        <Spinner />
                    </VStack>
                )
            )}
            {signUpError && (
                <Alert status="error">
                    <AlertIcon />
                    {signUpError}
                </Alert>
            )}
        </VStack>
    );
};

SignUp.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default SignUp;

export const getServerSideProps = withPageAuth({
    authRequired: false,
    getServerSideProps: async (ctx, supabase) => {
        const signupDisabled = false;
        if (signupDisabled) {
            return {
                redirect: {
                    permanent: true,
                    destination: '/',
                },
            };
        }
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            throw error;
        }

        if (data.session) {
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
