import { Alert, AlertIcon, Spinner, Text, VStack } from '@chakra-ui/react';
import { withPageAuth } from 'utils/supabase/withPageAuth';

import { useSupabaseClient } from '@/components/providers/SupabaseProvider';
import LoginLayout from 'layouts/LoginLayout';
import { useInsertContactInformation } from 'modules/contactInformation/hooks';
import { useUpdateProfile } from 'modules/profile/hooks';
import DetailInformation from 'modules/signup/components/DetailInformationForm';
import EmailAndPasswordForm, {
    SignUpInfo,
} from 'modules/signup/components/EmailAndPasswordForm';
import PersonalInfoForm, {
    PersonalInfo,
} from 'modules/signup/components/PersonalInfoForm';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const MentorSignUp: NextPageWithLayout = () => {
    const supabaseClient = useSupabaseClient();
    const [emailAndPassword, setEmailAndPassword] = useState<SignUpInfo>({
        email: '',
        password: '',
    });
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();

    const [step, setStep] = useState(0);
    const [signUpError, setSignUpError] = useState<string>('');
    const { updateProfile } = useUpdateProfile();
    const { insertContactInformation } = useInsertContactInformation();
    const router = useRouter();

    const { firstName, lastName, email } = router.query;

    async function onSignUp(skills: string[], bio: string) {
        setSignUpError('');
        await supabaseClient.auth
            .signUp({
                email: emailAndPassword.email,
                password: emailAndPassword.password,
            })
            .then(({ data, error }) => {
                if (error) throw error.message;
                if (!data.user) throw 'Could not create user';
                return data.user;
            })
            .then((user) => {
                updateProfile({
                    ...personalInfo,
                    skills,
                    userId: user.id,
                    role: 'MENTOR',
                    bio,
                });
                insertContactInformation({
                    userId: user.id,
                    info: {
                        email: emailAndPassword.email,
                        phone: personalInfo?.phone || '',
                    },
                });
            })
            .then(() => router.push('/connect'))
            .catch((error) => setSignUpError(String(error)));
    }

    return (
        <VStack mx="auto" alignItems="stretch">
            {step == 0 ? (
                <EmailAndPasswordForm
                    signUpAs="mentor"
                    initialEmail={email as string}
                    onNext={(info) => {
                        setEmailAndPassword(info);
                        setStep(step + 1);
                    }}
                />
            ) : step == 1 ? (
                <PersonalInfoForm
                    initialFirstName={firstName as string}
                    initialLastName={lastName as string}
                    onNext={(info) => {
                        setPersonalInfo(info);
                        setStep(step + 1);
                    }}
                />
            ) : step == 2 ? (
                <DetailInformation
                    onContinue={(skills, bio) => {
                        onSignUp(skills, bio);
                        setStep(step + 1);
                    }}
                />
            ) : (
                step == 3 &&
                !signUpError && (
                    <VStack>
                        <Text color="gray.400">Creating mentor account</Text>
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

MentorSignUp.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default MentorSignUp;

export const getServerSideProps = withPageAuth({
    authRequired: false,
    getServerSideProps: async (context, supabase) => {
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
