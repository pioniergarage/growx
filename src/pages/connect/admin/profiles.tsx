import FullTable from '@/components/FullTable';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import { VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfiles } from 'hooks/profile';

export default function ProfilesAdmin() {
    const { profiles, isLoading } = useProfiles();

    return (
        <VStack alignItems="stretch">
            <AdminBreadcrumbs
                route={[['Profiles', '/connect/admin/profiles']]}
            />
            <FullTable
                loading={isLoading}
                values={profiles || []}
                idProp="userId"
                heading="Profiles"
            />
        </VStack>
    );
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
