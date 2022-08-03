import ConnectLayout from '@/components/layouts/ConnectLayout';
import PageLink from '@/components/nav/PageLink';
import { Heading, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { NextPageWithLayout } from 'types';

const ConnectIndex: NextPageWithLayout = () => {
    return (
        <VStack>
            <Heading>GROWconnect</Heading>
            <PageLink href="/">Back to Landing Page</PageLink>
        </VStack>
    );
};

ConnectIndex.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default ConnectIndex;

export const getServerSideProps = withPageAuth({ redirectTo: '/connect/login' });
