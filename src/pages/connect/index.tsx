import ConnectLayout from '@/components/layouts/ConnectLayout';
import PageLink from '@/components/nav/PageLink';
import {
    Box,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    Tag,
    Flex,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import useProfiles from 'hooks/useProfiles';
import { useEffect } from 'react';
import { NextPageWithLayout, ProfileDto } from 'types';

function ProfileCard({ profile }: { profile: ProfileDto }) {
    return (
        <Flex bg="whiteAlpha.200" p={4} borderRadius={4} flexDir="column">
            <Heading as="h3" size="md">
                {profile.first_name} {profile.last_name}
            </Heading>
            <Box flexGrow={1}>
                <Text fontSize="sm" color="whiteAlpha.600">
                    {profile.email}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.600">
                    {profile.phone}
                </Text>
            </Box>

            <HStack mt={2}>
                <Tag>Computer Science</Tag>
                <Tag>Marketing</Tag>{' '}
            </HStack>
        </Flex>
    );
}

const ConnectIndex: NextPageWithLayout = () => {
    const {user} = useUser()
    const { values: profiles, fetch: fetchProfiles } = useProfiles();
    useEffect(() => {
        fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return (
        <Box>
            <Heading>GROWconnect</Heading>
            <PageLink href="/">Back to Landing Page</PageLink>

            <Box mt={8}>
                <Heading size="md" as="h3">
                    Participants
                </Heading>
                <SimpleGrid columns={4} gap={4} mt={6}>
                    {profiles.map((profile) => (
                        <ProfileCard key={profile.user_id} profile={profile} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

ConnectIndex.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default ConnectIndex;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
