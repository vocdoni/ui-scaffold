import { extendTheme } from '@chakra-ui/react';
import { theme as vtheme } from '@vocdoni/react-components';

const colors = {
  black: {
    c60: '#1A202C',
    c90: '#0f141c',
  },
};

export const theme = extendTheme(vtheme, {
  colors,
});
