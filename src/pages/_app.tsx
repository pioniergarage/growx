import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/layouts/Layout';
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
