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
  primary: '#6B46C1',
  secondary: '#ED64A6',
};

const textConfig: ComponentStyleConfig = {
  variants: {
    info: {
      color: '#A0AEC0',
      fontSize: 'sm',
    },
  },
};

const theme = extendTheme({ config, colors, components: { Text: textConfig } });
export default theme;
