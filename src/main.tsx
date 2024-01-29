import { Buffer } from "buffer";

import React from "react";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import "@rainbow-me/rainbowkit/styles.css";

import App, { config } from "./App.tsx";

import "react-toastify/dist/ReactToastify.css";
import "beercss";

declare global {
  interface Global {
    Buffer: typeof Buffer;
  }
}

(globalThis as any as Global).Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
