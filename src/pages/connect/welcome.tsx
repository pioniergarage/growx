import ConnectLayout from '@/components/layouts/ConnectLayout';
import { NextPageWithLayout } from 'types';

const WelcomePage: NextPageWithLayout = () => {
    return <>Welcome to GROW!</>;
};
WelcomePage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export default WelcomePage;
