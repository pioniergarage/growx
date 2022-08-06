import FullTable from '@/components/FullTable';
import ConnectLayout from '@/components/layouts/ConnectLayout';
import { Heading, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { NextPageWithLayout } from 'types';

const AdminPage: NextPageWithLayout = () => {

    const mockProfiles = [
        {firstName: "Peter", lastName: "Fox", user_id: "fdlkgjfdsglkj"}
    ]

    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4}>
            <Heading>Admin</Heading>
            <FullTable values={mockProfiles} idProp="user_id" heading="Profiles" />
        </VStack>
    );
};

AdminPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default AdminPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
