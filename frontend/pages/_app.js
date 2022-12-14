import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const fevmChain = {
  id: 31415,
  name: "Filecoin Wallaby",
  network: "wallaby",
  nativeCurrency: {
    decimals: 18,
    name: "FVM",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: "https://wallaby.node.glif.io/rpc/v0",
  },
  blockExplorers: {
    default: {
      name: "explorer.glif.io",
      url: "https://explorer.glif.io/?network=wallaby",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [fevmChain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== fevmChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "FVM NFT Marketplace",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  persister: false,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
