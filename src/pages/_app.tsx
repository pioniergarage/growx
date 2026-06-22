import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/800.css';
import '../../fonts/neoneon.css';
import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import Layout from 'layouts/Layout';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import theme from 'styles/theme';
import { NextPageWithLayout } from 'utils/types';
import { ConsentPreferences, CookieBanner } from '../components/CookieBanner';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // State is now an object matching our interface
    const [consent, setConsent] = useState<ConsentPreferences>({
        analytics: false,
        marketing: false,
    });

    const isProd = process.env.NODE_ENV === 'production';

    useEffect(() => {
        try {
            const storedConsent = localStorage.getItem('cookieConsent');
            if (storedConsent) {
                setConsent(JSON.parse(storedConsent));
            }
        } catch (error) {
            console.error("Failed to parse consent data");
        }
    }, []);

    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

    return (
        <ChakraProvider theme={theme}>
            {/* Inject Google Analytics ONLY if analytics consent is granted */}
            {isProd && consent.analytics && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=G-8RJZFTKYB5`}
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-8RJZFTKYB5', {
                                    page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                </>
            )}

            {getLayout(<Component {...pageProps} />)}

            <CookieBanner onSave={(preferences) => setConsent(preferences)} />
        </ChakraProvider>
    );
}