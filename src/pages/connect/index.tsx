import PageLink from '@/components/nav/link';
import { NextPage } from 'next';

const ConnectIndex: NextPage = () => {
    return (
        <>
            You are logged in!
            <PageLink href="/">Back to Base</PageLink>
        </>
    );
};
export default ConnectIndex;
