import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Profile } from 'model';
import { fetchUserAvatar } from 'api/avatar';
import { useMemo } from 'react';

const UserAvatar = ({
    profile,
    ...rest
}: { profile?: Profile } & AvatarProps) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const avatar = useMemo(
        () => (profile ? profile.avatar : undefined),
        [profile]
    );
    useEffect(() => {
        (async () => {
            if (!avatar) {
                setAvatarUrl('');
                return;
            }
            const { data, error } = await fetchUserAvatar(avatar);
            if (error) {
                console.error(error.message);
            }
            if (data) {
                const url = URL.createObjectURL(data);
                setAvatarUrl(url);
            }
        })();
    }, [avatar]);
    if (!profile) {
        return <SkeletonCircle size="12" />;
    }
    return (
        <Avatar
            userSelect="none"
            size="md"
            name={profile.firstName + ' ' + profile.lastName}
            src={avatarUrl}
            bg="primary-bg"
            {...rest}
        />
    );
};
export default UserAvatar;
