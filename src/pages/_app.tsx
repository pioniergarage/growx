import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/layouts/Layout';
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
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
        <UserProvider supabaseClient={supabaseClient}>
            <ChakraProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
        </UserProvider>
    );
}
