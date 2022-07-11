import { Head, Html, Main, NextScript } from 'next/document';

const CustomDocument = () => {
    return (
        <Html lang='en' data-theme='emerald'>
            <Head>{/* TODO Add icons here */}</Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};
export default CustomDocument;
