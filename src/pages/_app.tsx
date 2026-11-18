import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/800.css';
import '../../fonts/neoneon.css';
import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import Layout from 'layouts/Layout';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import theme from 'styles/theme';
import { NextPageWithLayout } from 'utils/types';
import {
    ConsentPreferences,
    CookieBanner,
    externalMediaConsent,
    noOptionalConsent,
    readConsentPreferences,
} from '../components/CookieBanner';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const analyticsId = 'G-8RJZFTKYB5';
const disableAnalyticsKey = `ga-disable-${analyticsId}` as const;
const isConnectRoute = (path: string) => /^\/connect(?:[/?#]|$)/.test(path);

function setAnalyticsDisabled(disabled: boolean) {
    (window as Window & { [disableAnalyticsKey]?: boolean })[disableAnalyticsKey] = disabled;
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [consent, setConsent] = useState(noOptionalConsent);
    const router = useRouter();
    const isProd = process.env.NODE_ENV === 'production';
    const mayTrack = isProd && !isConnectRoute(router.pathname);
    const analyticsAllowed = mayTrack && consent.analytics;

    useEffect(() => {
        setConsent(readConsentPreferences() ?? noOptionalConsent);
    }, []);

    useEffect(() => {
        setAnalyticsDisabled(!analyticsAllowed);
        const suspendOnConnect = (url: string) => {
            if (isConnectRoute(url)) setAnalyticsDisabled(true);
        };
        const restoreAfterFailure = () => setAnalyticsDisabled(!analyticsAllowed);
        router.events.on('routeChangeStart', suspendOnConnect);
        router.events.on('routeChangeError', restoreAfterFailure);
        return () => {
            router.events.off('routeChangeStart', suspendOnConnect);
            router.events.off('routeChangeError', restoreAfterFailure);
        };
    }, [analyticsAllowed, router.events]);

    const saveConsent = (preferences: ConsentPreferences) => {
        setAnalyticsDisabled(!(mayTrack && preferences.analytics));
        setConsent(preferences);
    };

    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

    return (
        <ChakraProvider theme={theme}>
            {analyticsAllowed && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${analyticsId}', {
                                    page_path: window.location.pathname,
                                    page_location: window.location.origin + window.location.pathname,
                                    page_referrer: '',
                                });
                            `,
                        }}
                    />
                </>
            )}

            <externalMediaConsent.Provider value={consent.marketing}>
                {getLayout(<Component {...pageProps} />)}
            </externalMediaConsent.Provider>

            <CookieBanner onSave={saveConsent} />
        </ChakraProvider>
    );
}
