import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { fetchUserAvatar } from 'api';
import { useEffect, useState } from 'react';
import { Profile } from 'model';

const UserAvatar = ({ profile, ...rest }: { profile?: Profile } & AvatarProps) => {
    const [avatarUrl, setAvatarUrl] = useState("");
    useEffect(() => {
        async function downloadAvatar() {
            if (!profile) return
            const { data, error } = await fetchUserAvatar(profile.userId)
            if (error) {
                console.error(error.message);
            }
            if (data) {
                const url = URL.createObjectURL(data);
                setAvatarUrl(url);
            }
        }
        downloadAvatar();
    }, [profile]);
    if (!profile) {
        return <SkeletonCircle size="12" />;
    }
    return (
        <Avatar
            size="md"
            name={profile.firstName + ' ' + profile.lastName}
            src={avatarUrl}
            bg='primary-bg'
            {...rest}
        />
    );
};
export default UserAvatar;
