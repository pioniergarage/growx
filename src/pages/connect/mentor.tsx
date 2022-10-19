import { Alert, AlertIcon, Spinner, Text, VStack } from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import LoginLayout from 'layouts/LoginLayout';
import { useUpsertProfile } from 'modules/profile/hooks';
import DetailInformation from 'modules/signup/components/DetailInformationForm';
import EmailAndPasswordForm, {
    SignUpInfo,
} from 'modules/signup/components/EmailAndPasswordForm';
import PersonalInfoForm from 'modules/signup/components/PersonalInfoForm';
import { PersonalInfo } from 'modules/signup/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const MentorSignUp: NextPageWithLayout = () => {
    const supabaseClient = useSupabaseClient();
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

    const [step, setStep] = useState(0);
    const [signUpError, setSignUpError] = useState<string>('');
    const { upsertProfile } = useUpsertProfile();
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
                upsertProfile({
                    ...personalInfo,
                    skills,
                    user_id: user.id,
                    type: 'MENTOR',
                    bio,
                    avatar: '',
                    is_student: false,
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
                    initialInfo={{
                        forename: firstName as string,
                        surname: lastName as string,
                    }}
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
            ) : step == 3 && !signUpError ? (
                <VStack>
                    <Text color="gray.400">Creating mentor account</Text>
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

MentorSignUp.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default MentorSignUp;
