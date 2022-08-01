import ConnectLayout from '@/components/layouts/ConnectLayout';
import PageLink from '@/components/nav/link';
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
