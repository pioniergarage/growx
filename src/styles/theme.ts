import { Colors, ComponentStyleConfig, extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const colors: Colors = {
    primary: '#8355f7',
    secondary: '#d34dbc'
}

const textConfig: ComponentStyleConfig = {
    variants: {
        'info': {
            color: 'gray.200',
            fontSize: 'sm'
        }
    }
}

const theme = extendTheme({ config, colors, components: { Text: textConfig } })
export default theme