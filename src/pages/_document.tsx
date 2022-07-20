import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';
import theme from 'styles/theme';

const CustomDocument = () => {
  return (
    <Html lang="en">
      <Head>{/* TODO Add icons here */}</Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default CustomDocument;
