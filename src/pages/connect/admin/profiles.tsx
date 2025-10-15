import AdminBreadcrumbs, {
    AdminBreadcrumbItem,
} from '@/components/navigation/AdminBreadcrumbs';
import {
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from 'utils/supabase/withPageAuth';

import ParticipantsTab from 'modules/admin/components/ParticipantsTab';
import UsersTab from 'modules/admin/components/UsersTab';
import { useFullProfiles } from 'modules/admin/hooks';
import { allowOrga } from 'modules/admin/utils';

export default function ProfilesAdmin() {
    const { profiles, isLoading } = useFullProfiles();

    return (
        <VStack alignItems="stretch">
            <AdminBreadcrumbs>
                <AdminBreadcrumbItem href="/connect/admin/profiles">
                    Profiles
                </AdminBreadcrumbItem>
            </AdminBreadcrumbs>
            {isLoading || !profiles ? (
                <Spinner />
            ) : (
                <Tabs>
                    <TabList overflowX="scroll" pb={1} maxW="100%">
                        <Tab>Participants</Tab>
                        <Tab>Mentors</Tab>
                        <Tab>Orga</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            <ParticipantsTab profiles={profiles} />
                        </TabPanel>
                        <TabPanel px={0}>
                            <UsersTab profiles={profiles} role='MENTOR' />
                        </TabPanel>
                        <TabPanel px={0}>
                            <UsersTab profiles={profiles} role='ORGA' />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            )}
        </VStack>
    );
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: allowOrga,
});
