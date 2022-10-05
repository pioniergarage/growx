import DetailInformation from '@/components/signup/DetailInformationForm';
import NameAndPasswordForm, {
    SignUpInfo,
} from '@/components/signup/EmailAndPasswordForm';
import PersonalInfoForm, {
    PersonalInfo,
} from '@/components/signup/PersonalInfoForm';
import { Alert, AlertIcon, Spinner, Text, VStack } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUpdateProfile } from 'hooks/profile';
import LoginLayout from 'layouts/LoginLayout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const MentorSignUp: NextPageWithLayout = () => {
    const [emailAndPassword, setEmailAndPassword] = useState<SignUpInfo>({
        email: '',
        password: '',
    });
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();

    const [step, setStep] = useState(0);
    const [signUpError, setSignUpError] = useState<string>('');
    const { updateProfile } = useUpdateProfile();
    const router = useRouter();

    const { firstName, lastName, email } = router.query;



    async function onSignUp(skills: string[], bio: string) {
        setSignUpError('');
        await supabaseClient.auth
            .signUp({
                email: emailAndPassword.email,
                password: emailAndPassword.password,
            })
            .then(({ user, error }) => {
                if (error) throw error.message;
                if (!user) throw 'Could not create user';
                return user;
            })
            .then((user) => {
                updateProfile({
                    ...personalInfo,
                    skills,
                    email: emailAndPassword.email,
                    userId: user.id,
                    role: 'MENTOR',
                    bio,
                });
            })
            .then(() => router.push('/connect'))
            .catch((error) => setSignUpError(String(error)));
    }

    return (
        <VStack mx="auto" alignItems="stretch">
            {step == 0 ? (
                <NameAndPasswordForm
                    signUpAs='mentor'
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
