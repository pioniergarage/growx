import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { Profile } from 'modules/profile/types';
import { useAvatarUrl } from '../hooks';

export interface UserAvatarProps extends AvatarProps {
    profile?: Partial<Profile>;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ profile, ...rest }) => {
    const { avatarUrl, isLoading } = useAvatarUrl({
        userId: profile?.userId,
        avatar: profile?.userId,
    });
    if (isLoading) {
        return <SkeletonCircle size={rest.size == 'sm' ? '10' : '12'} />;
    }
    return (
        <Avatar
            userSelect="none"
            size="md"
            name={profile?.firstName + ' ' + profile?.lastName}
            src={avatarUrl || undefined}
            bg="gray.500"
            {...rest}
        />
    );
};
export default UserAvatar;
