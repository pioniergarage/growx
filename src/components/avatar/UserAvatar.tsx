import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { useAvatarUrl } from 'hooks/profile';
import { Profile } from 'model';

interface UserAvatarProps extends AvatarProps {
    profile?: Profile;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ profile, ...rest }) => {
    const { avatarUrl, isLoading } = useAvatarUrl(profile);
    if (!profile || isLoading) {
        return <SkeletonCircle size="12" />;
    }
    return (
        <Avatar
            userSelect="none"
            size="md"
            name={profile.firstName + ' ' + profile.lastName}
            src={avatarUrl || undefined}
            bg="primary-bg"
            {...rest}
        />
    );
};
export default UserAvatar;
