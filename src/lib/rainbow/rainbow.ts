import { configureChains, createClient } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

export const { chains, provider } = configureChains(
	[mainnet, polygon, optimism, arbitrum],
	[publicProvider()]
);

export const { connectors } = getDefaultWallets({
	appName: 'My RainbowKit App',
	chains
});

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
});
