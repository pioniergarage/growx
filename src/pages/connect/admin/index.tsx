import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import PageLink from '@/components/navigation/PageLink';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Divider, Flex } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import InsertedStats from 'modules/admin/components/InsertedStats';
import { useProfileStats, useTeamsWithDates } from 'modules/admin/hooks';
import { useMemo } from 'react';

const AdminPage: React.FC = () => {
    const { profiles } = useProfileStats();
    const { teams } = useTeamsWithDates();
    const teamsWithDates = useMemo(
        () =>
            (teams ?? []).map((t) => ({
                ...t,
                insertedAt: new Date(t.insertedAt),
            })),
        [teams]
    );

    const participants = useMemo(
        () => profiles.filter((p) => p.role === 'PARTICIPANT'),
        [profiles]
    );
    const signedUpSq = useMemo(
        () =>
            profiles.filter(
                (p) => p.role === 'PARTICIPANT' && p.keyQualification
            ),
        [profiles]
    );

    return (
        <Flex flexDir="column" gap={4}>
            <Flex gap={4}>
                <AdminBreadcrumbs route={[]} />
                <ChevronRightIcon color="gray.500" mt={1} />
                <Flex as="ul" flexDir="column" color="gray.500">
                    <PageLink href="/connect/admin/profiles">Profiles</PageLink>
                    <PageLink href="/connect/admin/sponsors">Sponsors</PageLink>
                    <PageLink href="/connect/admin/events">Events</PageLink>
                    <PageLink href="/connect/admin/teams">Teams</PageLink>
                </Flex>
            </Flex>
            <Divider />
            <Flex wrap="wrap" gap={4}>
                <InsertedStats data={participants}>Participants</InsertedStats>
                <InsertedStats data={signedUpSq}>
                    Signed up for SQ
                </InsertedStats>
                <InsertedStats data={teamsWithDates}>Teams</InsertedStats>
            </Flex>
        </Flex>
    );
};

export default AdminPage;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
