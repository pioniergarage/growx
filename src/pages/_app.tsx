import '../styles/globals.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/800.css';

import type { AppProps } from 'next/app';
import Layout from 'components/layouts/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'styles/theme';
import { NextPageWithLayout } from 'types';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout =
        Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

    return (
            <ChakraProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
    );
}
