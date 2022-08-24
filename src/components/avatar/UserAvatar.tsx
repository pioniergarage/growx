import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Profile } from 'model';
import { fetchUserAvatar } from 'api/avatar';

const UserAvatar = ({
    profile,
    ...rest
}: { profile?: Profile } & AvatarProps) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    useEffect(() => {
        (async () => {
            if (!profile || !profile.avatar) return;
            const { data, error } = await fetchUserAvatar(profile.avatar);
            if (error) {
                console.error(error.message);
            }
            if (data) {
                const url = URL.createObjectURL(data);
                setAvatarUrl(url);
            }
        })();
    }, [profile]);
    if (!profile) {
        return <SkeletonCircle size="12" />;
    }
    return (
        <Avatar
            size="md"
            name={profile.firstName + ' ' + profile.lastName}
            src={avatarUrl}
            bg="primary-bg"
            {...rest}
        />
    );
};
export default UserAvatar;
