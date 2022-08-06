import { SkeletonCircle } from '@chakra-ui/react';
import { useProfile } from 'hooks/profile';
import UserAvatar from '../avatar/userAvatar';



const AvatarWrapper = () => {
    const {profile} = useProfile()

    return (
        <>
            {profile ? (
                <UserAvatar {...profile}/>
            ) : (
                <SkeletonCircle size='12' />
            )}
        </>
    );
};
export default AvatarWrapper;
