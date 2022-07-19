import { Colors, extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const colors: Colors = {
    primary: '#8355f7',
    secondary: '#d34dbc'
}

const theme = extendTheme({ config, colors })
export default theme