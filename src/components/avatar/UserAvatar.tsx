import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { useAvatarUrl } from 'hooks/profile';
import { Profile } from 'model';

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
        return <SkeletonCircle size="12" />;
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
