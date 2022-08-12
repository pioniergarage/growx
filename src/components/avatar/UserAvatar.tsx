import { Avatar, AvatarProps, SkeletonCircle } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { Profile } from 'types';

const UserAvatar = ({ profile, ...rest }: { profile?: Profile } & AvatarProps) => {
    const [avatarUrl, setAvatarUrl] = useState("");
    useEffect(() => {
        if (!profile) return
        async function downloadAvatar() {
            const { data, error } = await supabaseClient.storage
                .from('avatars')
                .download(`${profile?.user_id}.jpg`);
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
