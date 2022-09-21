import NameAndPasswordForm, { SignUpInfo } from '@/components/signup/EmailAndPasswordForm';
import PersonalInfoForm, { PersonalInfo } from '@/components/signup/PersonalInfoForm';
import SelectSkills from '@/components/signup/DetailInformationForm';
import { Alert, AlertIcon, VStack } from '@chakra-ui/react';
import LoginLayout from 'layouts/LoginLayout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const MentorSignUp: NextPageWithLayout = () => {
    const [emailAndPassword, setEmailAndPassword] = useState<SignUpInfo>({email: '', password: ''})
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>()
    const [skills, setSkills] = useState<string[]>([])


    const [step, setStep] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState<string>('');
    //const { updateProfile } = useUpdateProfile();
    const router = useRouter();

    const { firstName, lastName, email } = router.query;


    async function onSignUp() {
        setLoading(true);
        router.push('/connect')

        setSignUpError('')
        console.log(emailAndPassword, personalInfo, skills)
        /* commented out for testing purposes
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
                updateProfile({ ...personalInfo, skills, email: emailAndPassword.email, userId: user.id, role: 'MENTOR' });
            })
            .then(() => router.push('/connect'))
            .catch((error) => setSignUpError(String(error))); */
        setLoading(false);
    }


    return (
        <VStack mx="auto" alignItems="stretch">
            {step == 0 ? (
                <NameAndPasswordForm
                    initialEmail={email as string}
                    onNext={(info) => {
                        setEmailAndPassword(info)
                        setStep(step + 1)
                    }}
                />
            ) : step == 1 ? (
                <PersonalInfoForm
                    initialFirstName={firstName as string}
                    initialLastName={lastName as string}
                    onNext={(info) => {
                        setPersonalInfo(info)
                        setStep(step + 1)
                    }}
                />
            ) : step == 2 ? (
                <SelectSkills
                    isLoading={isLoading}
                    onContinue={(skills) => {
                        setSkills(skills)
                        onSignUp()
                    }}
                />
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
