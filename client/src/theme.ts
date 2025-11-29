import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const colors = {
    brand: {
        50: '#E6F6FF',
        100: '#BAE3FF',
        200: '#7CC4FA',
        300: '#47A3F3',
        400: '#2186EB',
        500: '#0967D2', // Primary Blue
        600: '#0552B5',
        700: '#03449E',
        800: '#01337D',
        900: '#002159',
    },
    accent: {
        50: '#FFF9E6',
        100: '#FFEDB8',
        200: '#FFDF8A',
        300: '#FFD15C',
        400: '#FFC32E',
        500: '#E6A700', // Gold
        600: '#B38200',
        700: '#805D00',
        800: '#4D3800',
        900: '#1A1200',
    },
};

const fonts = {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
};

const components = {
    Button: {
        baseStyle: {
            fontWeight: 'bold',
            borderRadius: 'lg',
        },
        variants: {
            solid: (props: any) => ({
                bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
                color: 'white',
                _hover: {
                    bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                },
                transition: 'all 0.2s',
            }),
        },
    },
    Card: {
        baseStyle: {
            container: {
                borderRadius: 'xl',
                boxShadow: 'xl',
                bg: 'white',
                overflow: 'hidden',
            },
        },
    },
};

const theme = extendTheme({ config, colors, fonts, components });

export default theme;
