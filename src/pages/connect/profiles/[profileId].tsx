import ProfileCard from '@/components/profile/ProfileCard';
import { VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfile } from 'hooks/profile';
import { useTeam, useTeamIdOfUser } from 'hooks/team';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'utils/types';

const ProfilePage: NextPageWithLayout = () => {
    const router = useRouter();
    const profileId = router.query.profileId as string;
    const { profile } = useProfile(profileId);
    const { teamId } = useTeamIdOfUser(profile?.userId);
    const { team } = useTeam(teamId);

    return (
        <VStack alignItems="stretch">
            {profile ? <ProfileCard {...profile} team={team} /> : undefined}
        </VStack>
    );
};

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
export default ProfilePage;
