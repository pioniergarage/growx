import { Box, Button, SkeletonCircle, Stack } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import useProfile from 'hooks/useProfile';
import { useState } from 'react';
import UserAvatar from '../avatar/userAvatar';
import LogInWrapper from '../modals/loginModal';



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
