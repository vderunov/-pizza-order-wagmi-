import { http, createConfig } from "wagmi";

import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/ZRKs5hQwL4HkUTCgW6R__ttWRCVnQb63",
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
