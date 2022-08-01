import { Avatar } from '@chakra-ui/react';

export type UserAvatarProps = {
    firstName: string;
    lastName: string;
};

const UserAvatar = (props: UserAvatarProps) => {
    return (
        <>
            <Avatar
                size='sm'
                name={props.firstName + ' ' + props.lastName}
                src={`https://ui-avatars.com/api/?name=${
                    props.firstName + '+' + props.lastName
                }`}
            />
        </>
    );
};
export default UserAvatar;
