import FullTable from '@/components/FullTable';
import ConnectLayout from '@/components/layouts/ConnectLayout';
import { Heading, useToast, VStack } from '@chakra-ui/react';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { NextPageWithLayout, ProfileDto } from 'types';

const AdminPage: NextPageWithLayout = () => {
    const toast = useToast()
    const [profiles, setProfiles] = useState<ProfileDto[]>([])

    useEffect(() => {
        (async () => {
            const {data, error} = await supabaseClient.from<ProfileDto>('profiles')
                .select('*')
            if (error) {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }
            if (data) {
                setProfiles(data)
            }
        })()
    }, [])

    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4}>
            <Heading>Admin</Heading>
            <FullTable values={profiles} idProp="user_id" heading="Profiles" />
        </VStack>
    );
};

AdminPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default AdminPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
