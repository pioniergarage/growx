import FileSelect from '@/components/FileSelect';
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

import UserAvatar from 'modules/avatar/components/UserAvatar';
import { useUploadAvatar } from 'modules/avatar/hooks';
import {
    useContactInformation,
    useUpdateContactInformation,
} from 'modules/contactInformation/hooks';
import { ContactInformation } from 'modules/contactInformation/types';
import ProfileForm from 'modules/profile/components/ProfileForm';
import UsersProfileView from 'modules/profile/components/UsersProfileView';
import { useProfile, useUpdateProfile } from 'modules/profile/hooks';
import { Profile } from 'modules/profile/types';
import { useMemo, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

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
    const { contactInformation } = useContactInformation();
    const { updateContactInformation } = useUpdateContactInformation();
    const toast = useToast();

    async function handleSave(
        profile: Profile,
        contactInformation: ContactInformation
    ) {
        try {
            await updateProfile(profile);
            await updateContactInformation({
                userId: profile.userId,
                info: contactInformation,
            });
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
            {!isEditing || !profile || !contactInformation ? (
                profile && contactInformation ? (
                    <>
                        <UsersProfileView
                            profile={profile}
                            contact={contactInformation}
                        />
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
                    contactInformation={contactInformation}
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
