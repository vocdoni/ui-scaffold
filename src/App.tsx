import { ColorModeScript, useColorMode } from '@chakra-ui/react';
import { Signer } from '@ethersproject/abstract-signer';
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { ClientProvider } from '@vocdoni/react-components';
import { RouterProvider } from 'react-router-dom';
import { useSigner } from 'wagmi';
import { chains } from './lib/rainbow/rainbow';
import router from './router/Router';

export const App = () => {
  const { data: signer } = useSigner();
  const { colorMode } = useColorMode();

  const rainbowStyles =
    colorMode === 'light'
      ? lightTheme({
          accentColor: '#78D8AA',
          accentColorForeground: 'white',
          borderRadius: 'medium',
        })
      : darkTheme({
          accentColor: '#78D8AA',
          accentColorForeground: 'white',
          borderRadius: 'medium',
        });

  return (
    <RainbowKitProvider chains={chains} theme={rainbowStyles}>
      <ClientProvider env="dev" signer={signer as Signer}>
        <ColorModeScript />
        <RouterProvider router={router} />
      </ClientProvider>
    </RainbowKitProvider>
  );
};
