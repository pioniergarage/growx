import ConnectLayout from 'layouts/ConnectLayout';
import PageLink from '@/components/navigation/PageLink';
import { Box, Heading } from '@chakra-ui/react';
import { NextPageWithLayout } from 'utils/types';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const ConnectIndex: NextPageWithLayout = () => {
    return (
        <Box>
            <Heading>GROWconnect</Heading>
            <PageLink href="/">Back to Landing Page</PageLink>
        </Box>
    );
};

ConnectIndex.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default ConnectIndex;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
