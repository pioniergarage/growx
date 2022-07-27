import { Avatar } from '@chakra-ui/react';

export type UserAvatarProps = {
    name: string;
    src: string;
};

const UserAvatar = (props: UserAvatarProps) => {
    return (
        <>
            <Avatar name={props.name} src={props.src} />
        </>
    );
};
export default UserAvatar;
