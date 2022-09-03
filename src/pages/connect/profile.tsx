import UserAvatar from '@/components/avatar/UserAvatar';
import FileSelect from '@/components/FileSelect';
import ProfileForm from '@/components/profile/ProfileForm';
import {
    Box,
    Button,
    Grid,
    Heading,
    Skeleton,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfile, useUpdateProfile, useUploadAvatar } from 'hooks/profile';
import { Profile } from 'model';
import { useMemo, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const ProfilePropertyRow = ({
    name,
    value,
}: {
    name: string;
    value?: string | number;
}) => (
    <>
        <Box fontWeight="semibold">{name}</Box>
        <Box>{value}</Box>
    </>
);

function ProfileView({ profile }: { profile: Profile }) {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: '10rem 1fr' }}
            gap={{ base: 0, md: 2 }}
            maxW="container.lg"
        >
            <ProfilePropertyRow
                name="Name"
                value={profile.firstName + ' ' + profile.lastName}
            />
            <ProfilePropertyRow name="Email" value={profile.email} />
            <ProfilePropertyRow name="Phone" value={profile.phone} />
            <ProfilePropertyRow name="Gender" value={profile.gender} />
            <ProfilePropertyRow name="Homeland" value={profile.homeland} />
            <ProfilePropertyRow name="University" value={profile.university} />
            <ProfilePropertyRow name="Studies" value={profile.studies} />
            {['MENTOR', 'EXPERT', 'ORGA'].includes(profile.role) ? (
                <ProfilePropertyRow
                    name="Skills"
                    value={profile.skills.join(', ')}
                />
            ) : undefined}
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
    const toast = useToast();
    const { uploadUserAvatar, isLoading } = useUploadAvatar();
    async function uploadAvatar(files: FileList | null) {
        if (!profile) return;
        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.');
        }
        const file = files[0];
        await uploadUserAvatar(
            { profile, file },
            {
                onError: () => {
                    toast({
                        title: 'Something went wrong.',
                        status: 'error',
                    });
                },
                onSuccess: () => {
                    toast({
                        title: 'Profile picture upadted!',
                        status: 'success',
                    });
                },
            }
        );
    }
    return (
        <Box>
            <VStack alignItems="start">
                <UserAvatar
                    size="xl"
                    profile={profile}
                    filter={isLoading ? 'brightness(70%)' : undefined}
                />
                <FileSelect onSelect={uploadAvatar}>
                    <Button isLoading={isLoading} size="sm" variant="outline">
                        Update avatar
                    </Button>
                </FileSelect>
            </VStack>
        </Box>
    );
}

function ProfileDetailsControl() {
    const [isEditing, setEditing] = useState(false);
    const { profile, isLoading: loading } = useProfile();
    const { updateProfile } = useUpdateProfile();
    const toast = useToast();

    async function handleSave(profile: Profile) {
        try {
            await updateProfile(profile);

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
                        <ProfileView profile={profile} />
                        <Button
                            onClick={() => setEditing(true)}
                            width={20}
                            variant="outline"
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

export default ProfilePage;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
