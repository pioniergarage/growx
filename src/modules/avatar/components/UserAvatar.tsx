import {
    Avatar,
    AvatarProps,
    SkeletonCircle,
    useStyleConfig,
} from '@chakra-ui/react';
import { Profile } from 'modules/profile/types';
import { useAvatarUrl } from '../hooks';

export interface UserAvatarProps extends AvatarProps {
    profile?: Partial<Profile>;
    noSkeleton?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    profile,
    size,
    noSkeleton = false,
    ...rest
}) => {
    const { avatarUrl, isLoading } = useAvatarUrl({
        userId: profile?.userId,
        avatar: profile?.avatar,
    });
    const s = (
        useStyleConfig('Avatar', { size }) as { container: { width: number } }
    ).container.width;
    if (isLoading && !noSkeleton) {
        return <SkeletonCircle w={s} h={s} flexShrink="0" />;
    } else {
        return (
            <Avatar
                userSelect="none"
                name={profile?.firstName + ' ' + profile?.lastName}
                src={avatarUrl || undefined}
                bg="gray.500"
                size={size}
                {...rest}
            />
        );
    }
};
export default UserAvatar;
