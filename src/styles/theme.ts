import {
    Colors,
    ComponentStyleConfig,
    extendTheme,
    ThemeConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const colors: Colors = {
    primary: '#997ed6',
    'primary-bg': '#4f388488',
    secondary: '#ED64A6',
};

const textConfig: ComponentStyleConfig = {
    variants: {
        info: {
            color: '#bac5d4',
            fontSize: 'sm',
        },
    },
};

const FormLabel: ComponentStyleConfig = {
    baseStyle: {
        color: 'var(--chakra-colors-gray-400)',
    },
};

const theme = extendTheme({
    config,
    colors,
    components: { Text: textConfig, FormLabel },
    fonts: {
        body: `'Open Sans', sans-serif`,
    },
    styles: {
        global: () => ({
            body: {
                bg: 'gray.900',
            },
        }),
    },
});
export default theme;
