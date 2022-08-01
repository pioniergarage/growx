import LogInForm from '@/components/forms/logInForm';
import PageLink from '@/components/nav/link';
import { Heading, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

const ConnectIndex: NextPage = () => {
    async function handleLogin(creds: { email: string; password: string }) {}
    return (
        <VStack>
            <Heading size={{ base: 'lg', md: 'xl' }} mb={4}>
                Login
            </Heading>
            <LogInForm onSubmit={handleLogin} />
        </VStack>
    );
};
export default ConnectIndex;
