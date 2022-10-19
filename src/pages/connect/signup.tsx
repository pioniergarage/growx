import { Alert, AlertIcon, Spinner, Text, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import LoginLayout from 'layouts/LoginLayout';
import {
    useInsertFurhterProfileInfo,
    useUpsertProfile,
} from 'modules/profile/hooks';
import EmailAndPasswordForm, {
    SignUpInfo,
} from 'modules/signup/components/EmailAndPasswordForm';
import FurtherInfo from 'modules/signup/components/FurtherInfo';
import PersonalInfoForm from 'modules/signup/components/PersonalInfoForm';
import StudentForm from 'modules/signup/components/StudentForm';
import UniversityForm from 'modules/signup/components/UniversityForm';
import { PersonalInfo, StudentInformation } from 'modules/signup/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const SignUp: NextPageWithLayout = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { upsertProfile } = useUpsertProfile();
    const { insertFurtherProfileInfo } = useInsertFurhterProfileInfo();

    const [step, setStep] = useState(0);
    const [signUpError, setSignUpError] = useState<string>('');

    const [emailAndPassword, setEmailAndPassword] = useState<SignUpInfo>({
        email: '',
        password: '',
    });
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        forename: '',
        surname: '',
        gender: 'MALE',
        phone: '',
        country: '',
    });

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
        studentInfo?: StudentInformation
    ) {
        try {
            const user = await signUp(emailAndPassword);
            await upsertProfile({
                ...personalInfo,
                user_id: user.id,
                bio: '',
                is_student: !!studentInfo?.university,
                avatar: '',
                skills: [],
                type: 'PARTICIPANT',
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
                            createAccount(emailAndPassword, personalInfo);
                        }
                    }}
                />
            ) : step === 4 ? (
                <UniversityForm
                    onNext={({ university, university_country, sq }) => {
                        setStep(step + 1);
                        createAccount(emailAndPassword, personalInfo, {
                            sq,
                            university,
                            university_country,
                        });
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
    getServerSideProps: async (context, supabase) => {
        console.log('Hello from server side props');

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
