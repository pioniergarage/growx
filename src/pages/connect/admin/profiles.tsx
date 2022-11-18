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
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import MentorsTab from 'modules/admin/components/MentorsTab';
import ParticipantsTab from 'modules/admin/components/ParticipantsTab';
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
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            <ParticipantsTab profiles={profiles} />
                        </TabPanel>
                        <TabPanel px={0}>
                            <MentorsTab profiles={profiles} />
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
