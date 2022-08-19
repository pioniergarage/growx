import ConnectLayout from 'layouts/ConnectLayout';
import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPageWithLayout } from 'utils/types';

const WelcomePage: NextPageWithLayout = () => {
    return <Box>
        <Heading>Welcome to GROW!</Heading>
        <Text>You have successfully signed up for the GROW startup found contest!</Text>
    </Box>
};
WelcomePage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export default WelcomePage;
