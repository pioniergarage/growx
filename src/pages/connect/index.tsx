import PageLink from '@/components/navigation/PageLink';
import { Box, Heading } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { NextPageWithLayout } from 'utils/types';

const ConnectIndex: NextPageWithLayout = () => {
    return (
        <Box>
            <Heading>GROWconnect</Heading>
            <PageLink href="/">Back to Landing Page</PageLink>
        </Box>
    );
};

export default ConnectIndex;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
