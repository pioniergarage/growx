import { Box, Button, Stack } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import UserAvatar from '../avatar/userAvatar';
import LogInWrapper from '../modals/loginModal';

const user = {
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
};

const AvatarWrapper = () => {
    const [loggedIn, logIn] = useState(false);
    // const router = useRouter();

    return (
        <>
            {loggedIn ? (
                <Box as="button" onClick={() => logIn(false)}>
                    <UserAvatar name={user.name} src={user.avatar} />
                </Box>
            ) : (
                <Stack direction="row">
                    <Button onClick={() => console.log('Register')}>
                        GROWconnect
                    </Button>
                </Stack>
            )}
        </>
    );
};
export default AvatarWrapper;
