import { Avatar, SkeletonCircle } from '@chakra-ui/react';
import { Profile } from 'types';

const UserAvatar = ({ profile }: { profile?: Profile }) => {
    if (!profile) {
        return <SkeletonCircle size="12" />;
    }
    return (
        <Avatar
            size="md"
            name={profile.firstName + ' ' + profile.lastName}
            src={`https://ui-avatars.com/api/?name=${
                profile.firstName + '+' + profile.lastName
            }`}
        />
    );
};
export default UserAvatar;
