import { Head, Html, Main, NextScript } from 'next/document';

const CustomDocument = () => {
    return (
        <Html lang='en' data-theme='growDark'>
            <Head>{/* TODO Add icons here */}</Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};
export default CustomDocument;
