import { ColorMode, extendTheme } from '@chakra-ui/react';
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
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

export const rainbowStyles = (colormode: ColorMode) => {
  if (colormode === 'light') {
    return lightTheme({
      accentColor: '#78D8AA',
      accentColorForeground: 'white',
      borderRadius: 'medium',
    });
  }

  return darkTheme({
    accentColor: '#78D8AA',
    accentColorForeground: 'white',
    borderRadius: 'medium',
  });
};
