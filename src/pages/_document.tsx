import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';
import theme from 'styles/theme';

const CustomDocument = () => {
    const isProd = process.env.NODE_ENV === "production";

    return (
        <Html lang="en">
            <Head>{/* TODO Add icons here */}
                {isProd && (
                    <>
                        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8RJZFTKYB5"></script>
                        <script dangerouslySetInnerHTML={{
                            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-8RJZFTKYB5');
                `,
                        }} />
                    </>
                )}
            </Head>
            <body>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};
export default CustomDocument;
