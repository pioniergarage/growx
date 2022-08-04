import FullTable from '@/components/FullTable';
import ConnectLayout from '@/components/layouts/ConnectLayout';
import { Heading, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import useProfiles from 'hooks/useProfiles';
import useSponsors from 'hooks/useSponsors';
import { useEffect } from 'react';
import { NextPageWithLayout } from 'types';

const AdminPage: NextPageWithLayout = () => {
    const {user} = useUser();
    const { values: profiles, fetch: fetchProfiles } = useProfiles();
    const { values: sponsors, fetch: fetchSponsors } = useSponsors();

    useEffect(() => {
        async function fetch() {
            await fetchProfiles()
            await fetchSponsors()
        }
        fetch()
    }, [user])

    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4}>
            <Heading>Admin</Heading>
            <FullTable values={profiles} idProp="user_id" heading="Profiles" />
            <FullTable values={sponsors} idProp="name" heading="Sponsors" />
        </VStack>
    );
};

AdminPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default AdminPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
