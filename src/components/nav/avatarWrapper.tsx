import { SkeletonCircle } from '@chakra-ui/react';
import useProfile from 'hooks/useProfile';
import UserAvatar from '../avatar/userAvatar';



const AvatarWrapper = () => {
    const {profile} = useProfile()

    return (
        <>
            {profile ? (
                <UserAvatar {...profile}/>
            ) : (
                <SkeletonCircle size='10' />
            )}
        </>
    );
};
export default AvatarWrapper;
