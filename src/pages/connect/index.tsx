import ConnectLayout from '@/components/layouts/ConnectLayout';
import PageLink from '@/components/nav/PageLink';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { NextPageWithLayout } from 'types';

const ConnectIndex: NextPageWithLayout = () => {
    return (
        <>
            GROWconnect
            <PageLink href="/">Back to Landing Page</PageLink>
        </>
    );
};

ConnectIndex.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default ConnectIndex;

export const getServerSideProps = withPageAuth({ redirectTo: '/connect/login' });
