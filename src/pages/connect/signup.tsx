import {
    Alert,
    AlertIcon,
    Button,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import type { Session } from '@supabase/supabase-js';
import { withPageAuth } from 'utils/supabase/withPageAuth';

import { useSupabaseClient } from '@/components/providers/SupabaseProvider';
import LoginLayout from 'layouts/LoginLayout';
import { useSaveSignupInfo, useUpdateProfile } from 'modules/profile/hooks';
import { FurtherProfileInfo } from 'modules/profile/types';
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
import { useRef, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

type PendingAccount = {
    email: string;
    userId?: string;
    university?: string;
    universityCountry?: string;
};

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
        phone: '',
    });
    const [furtherInfo, setFurtherInfo] = useState<FurtherProfileInfo>();
    const [signUpError, setSignUpError] = useState<string>('');
    const [needsConfirmation, setNeedsConfirmation] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);
    const pendingAccount = useRef<PendingAccount>();
    const inFlight = useRef(false);

    const { updateProfile } = useUpdateProfile();
    const { saveSignupInfo } = useSaveSignupInfo();

    async function finishSignup(
        university?: string,
        universityCountry?: string
    ) {
        if (!furtherInfo || inFlight.current) return;
        inFlight.current = true;
        setIsFinishing(true);
        setSignUpError('');
        setStep(5);

        try {
            let account = pendingAccount.current;
            let session: Session | null;

            if (!account) {
                const { data, error } = await supabaseClient.auth.signUp(
                    emailAndPassword
                );
                if (error) throw error;
                if (!data.user)
                    throw new Error('Could not create the account.');

                account = {
                    email: emailAndPassword.email.trim().toLowerCase(),
                    userId: data.session?.user.id,
                    university,
                    universityCountry,
                };
                pendingAccount.current = account;
                session = data.session;
                if (!session) {
                    setNeedsConfirmation(true);
                    return;
                }
            } else {
                const { data, error } = await supabaseClient.auth.getSession();
                if (error) throw error;
                session = data.session;
                if (!session) {
                    const result = await supabaseClient.auth.signInWithPassword(
                        emailAndPassword
                    );
                    if (result.error) throw result.error;
                    session = result.data.session;
                }
            }

            const user = session?.user;
            if (
                !user?.email ||
                user.email.toLowerCase() !== account.email ||
                (account.userId && account.userId !== user.id)
            ) {
                throw new Error(
                    'Sign in with the account used for this signup.'
                );
            }
            pendingAccount.current = { ...account, userId: user.id };
            setNeedsConfirmation(false);

            await supabaseClient
                .from('contact_information')
                .upsert({
                    user_id: user.id,
                    email: user.email,
                    phone: personalInfo.phone,
                })
                .throwOnError();
            await updateProfile({
                firstName: personalInfo.firstName,
                lastName: personalInfo.lastName,
                userId: user.id,
                university: account.university,
                universityCountry: account.universityCountry,
            });
            await saveSignupInfo(furtherInfo);
            await router.replace('/connect');
        } catch (error) {
            if (!pendingAccount.current) setStep(0);
            setSignUpError(
                error instanceof Error
                    ? error.message
                    : 'Could not finish your GROW signup. Please try again.'
            );
        } finally {
            inFlight.current = false;
            setIsFinishing(false);
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
                        setFurtherInfo(info);
                        setStep(step + 1);
                    }}
                />
            ) : step === 3 ? (
                <StudentForm
                    onNext={(isStudent) => {
                        if (isStudent) {
                            setStep(step + 1);
                        } else {
                            void finishSignup();
                        }
                    }}
                />
            ) : step === 4 ? (
                <UniversityForm
                    onNext={({ university, country }) => {
                        void finishSignup(university, country);
                    }}
                />
            ) : (
                step === 5 && (
                    <VStack>
                        {isFinishing ? (
                            <>
                                <Text color="gray.400">Finishing signup</Text>
                                <Spinner />
                            </>
                        ) : (
                            <>
                                {needsConfirmation && (
                                    <Text>
                                        Confirm your email and keep this page
                                        open. Then finish your signup here.
                                    </Text>
                                )}
                                <Button onClick={() => void finishSignup()}>
                                    Finish signup
                                </Button>
                            </>
                        )}
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
