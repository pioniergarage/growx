import ConnectLayout from 'layouts/ConnectLayout';
import {
    Box,
    Heading,
    VStack,
    Text,
    Grid,
    Button,
    useToast,
    Skeleton
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfile } from 'hooks/profile';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { NextPageWithLayout, Profile } from 'types';
import LazySpinner from '@/components/profile/LazySpinner';
import ProfileForm from '@/components/profile/ProfileForm';
import UserAvatar from '@/components/avatar/UserAvatar';
import { uploadUserAvatar } from 'api';

function ProfileView() {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: '10rem 1fr' }}
            gap={{ base: 0, md: 2 }}
            maxW="container.lg"
            bg="whiteAlpha.100"
            p={4}
            borderRadius={3}
        >
            <LazySpinner name="First name" property="firstName" />
            <LazySpinner name="Last name" property="lastName" />
            <LazySpinner name="Gender" property="gender" />
            <LazySpinner name="Email address" property="email" />
            <LazySpinner name="Phone number" property="phone" />
            <LazySpinner name="Studies" property="studies" />
            <LazySpinner name="Homeland" property="university" />
        </Grid>
    );
}

function SkeletonLoader() {
    const rows = 6;
    const widths = useMemo(() => {
        const k = [0, 0.5, 0.2, 0.7, 0.4];
        const w = [];
        for (let i = 0; i < rows; i++) {
            w.push(k[i] * 5 + 4);
            w.push(k[(i + 3) % 5] * 30 + 5);
        }
        return w;
    }, []);
    return (
        <Grid templateColumns="10rem 1fr" gap={3} w="100%" maxW="50rem">
            {Array.from(Array(rows * 2).keys()).map((_, i) => (
                <Skeleton key={i} h={6} maxW={widths[i] + 'rem'} />
            ))}
        </Grid>
    );
}

function AvatarControl() {
    const { profile } = useProfile();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const uploadRef = useRef<HTMLInputElement>(null);
    async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
        if (!profile) return
        if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.');
        }
        setLoading(true);
        const file = event.target.files[0];
        const {error: uploadError} = await uploadUserAvatar(profile, file)
        setLoading(false);
        if (uploadError) {
            console.error(uploadError.message);
            toast({
                title: 'Something went wrong.',
                status: 'error',
            });
        } else {
            toast({
                title: 'Profile picture upadted!',
                status: 'success',
            });
        }
    }
    return (
        <Box>
            <VStack alignItems="start">
                <UserAvatar
                    size="xl"
                    profile={profile}
                    filter={loading ? 'brightness(70%)' : undefined}
                />
                <Button
                    isLoading={loading}
                    size="sm"
                    variant="outline"
                    onClick={() => uploadRef.current?.click()}
                >
                    Update profile picture
                </Button>
            </VStack>
            <input
                ref={uploadRef}
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                style={{ position: 'absolute', visibility: 'hidden' }}
            />
        </Box>
    );
}

function ProfileDetailsControl() {
    const [isEditing, setEditing] = useState(false);
    const { profile, loading, update } = useProfile();
    const toast = useToast();

    async function handleSave(profile: Profile) {
        try {
            await update(profile);

            toast({
                title: 'Profile updated.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setEditing(false);
        } catch (error) {
            toast({
                title: 'Something went wrong. Could not update profile.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    return (
        <VStack alignItems="stretch" gap={2}>
            {!isEditing || !profile ? (
                profile ? (
                    <>
                        <ProfileView />
                        <Button
                            onClick={() => setEditing(true)}
                            width={20}
                            variant='outline'
                        >
                            Edit
                        </Button>
                    </>
                ) : (
                    <SkeletonLoader />
                )
            ) : (
                <ProfileForm
                    profile={profile}
                    onSave={handleSave}
                    loading={loading}
                    onCancel={() => setEditing(false)}
                />
            )}
        </VStack>
    );
}

const ProfilePage: NextPageWithLayout = () => {
    return (
        <VStack alignItems="stretch" gap={4}>
            <Box>
                <Heading lineHeight={1}>Profile</Heading>
                <Text color="whiteAlpha.700" lineHeight={1}>
                    Your personal information
                </Text>
            </Box>
            <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={4}>
                <ProfileDetailsControl />
                <AvatarControl />
            </Grid>
        </VStack>
    );
};

ProfilePage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default ProfilePage;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
