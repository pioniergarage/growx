import ConnectLayout from '@/components/layouts/ConnectLayout';
import {
    Box,
    Heading,
    SimpleGrid,
    Spinner,
    VStack,
    Text,
    Grid,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import useProfile from 'hooks/useProfile';
import { createContext, useContext } from 'react';
import { NextPageWithLayout, Profile } from 'types';

const ProfileContext = createContext<Profile | null>(null);

function LazySpinner({
    property,
    name,
}: {
    property: keyof Profile;
    name: string;
}) {
    const profile = useContext(ProfileContext);
    return (
        <>
            <Box>
                <Text>{name}</Text>
            </Box>
            <Box>
                {profile ? (
                    <Text fontWeight="semibold">{profile[property] || '-'}</Text>
                ) : (
                    <Spinner />
                )}
            </Box>
        </>
    );
}

function ProfileView({ profile }: { profile: Profile | null }) {
    return (
        <ProfileContext.Provider value={profile}>
            <Grid templateColumns="10rem 1fr" gap={1} maxW="container.lg">
                <LazySpinner name="First name" property="firstName" />
                <LazySpinner name="Last name" property="lastName" />
                <LazySpinner name="Gender" property="gender" />
                <LazySpinner name="Email address" property="email" />
                <LazySpinner name="Phone number" property="phone" />
                <LazySpinner name="Studies" property="studies" />
                <LazySpinner name="Homeland" property="university" />
            </Grid>
        </ProfileContext.Provider>
    );
}

const ProfilePage: NextPageWithLayout = () => {
    const { profile } = useProfile();
    return (
        <VStack alignItems="stretch" gap={4}>
            <Box>
                <Heading lineHeight={1}>Profile</Heading>
                <Text color='whiteAlpha.700' lineHeight={1}>Your personal information</Text>
            </Box>
            <ProfileView profile={profile} />
        </VStack>
    );
};

ProfilePage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default ProfilePage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
