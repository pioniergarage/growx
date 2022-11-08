import {
    Colors,
    ComponentStyleConfig,
    defineStyleConfig,
    extendTheme,
    ThemeConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const colors: Colors = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    'grow-primary': {
        50: '#f1ebff',
        100: '#d1c4f0',
        200: '#b29ee1',
        300: '#9478d4',
        400: '#7551c7',
        500: '#5c37ad',
        600: '#472b87',
        700: '#331f62',
        800: '#1f113c',
        900: '#0c0419',
    },
    'grow-secondary': {
        50: '#ffe5f5',
        100: '#fab8d9',
        200: '#f38cbd',
        300: '#ec5fa3',
        400: '#e63389',
        500: '#cd1b6f',
        600: '#a01357',
        700: '#730b3e',
        800: '#470425',
        900: '#1d000e',
    },
};

const textConfig = defineStyleConfig({
    variants: {
        info: {
            color: '#bac5d4',
        },
    },
});

const headingConfig = defineStyleConfig({
    sizes: {
        lg: {
            fontSize: '4xl',
        },
    },
});

const FormLabel: ComponentStyleConfig = {
    baseStyle: {
        color: 'var(--chakra-colors-gray-400)',
    },
};

const theme = extendTheme({
    config,
    colors,
    components: { Text: textConfig, FormLabel, Heading: headingConfig },
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
