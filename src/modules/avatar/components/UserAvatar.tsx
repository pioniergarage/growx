import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { Profile } from 'modules/profile/types';
import { useAvatarUrl } from '../hooks';

export interface UserAvatarProps extends AvatarProps {
    userId?: Profile['userId'];
    avatar?: Profile['avatar'];
    firstName?: Profile['firstName'];
    lastName?: Profile['lastName'];
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    userId,
    avatar,
    firstName,
    lastName,
    ...rest
}) => {
    const { avatarUrl, isLoading } = useAvatarUrl({ userId, avatar });
    if (isLoading) {
        return <SkeletonCircle size={rest.size == 'sm' ? '10' : '12'} />;
    }
    return (
        <Avatar
            userSelect="none"
            size="md"
            name={firstName + ' ' + lastName}
            src={avatarUrl || undefined}
            bg="gray.500"
            {...rest}
        />
    );
};
export default UserAvatar;
