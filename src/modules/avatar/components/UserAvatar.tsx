import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { getFullName, Profile } from 'modules/profile/types';
import { useAvatarUrl } from '../hooks';

export interface UserAvatarProps extends AvatarProps {
    profile?: Profile;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ profile, ...rest }) => {
    const { avatarUrl, isLoading } = useAvatarUrl({
        userId: profile?.user_id,
        avatar: profile?.avatar ?? null,
    });
    if (isLoading) {
        return <SkeletonCircle size={rest.size == 'sm' ? '10' : '12'} />;
    }
    return (
        <Avatar
            userSelect="none"
            size="md"
            name={getFullName(profile)}
            src={avatarUrl || undefined}
            bg="gray.500"
            {...rest}
        />
    );
};
export default UserAvatar;
