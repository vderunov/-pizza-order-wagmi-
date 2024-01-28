import { useAccount, useReadContract } from "wagmi";

import { abi } from "./services/abi";
import { WalletOptions } from "./WalletOptions";
import { Account } from "./Account";

export const contractAddress = "0x241365cdF78Ea0b527a4BcD7CEeb8eB10B930E5a";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function App() {
  const { data, isLoading } = useReadContract({
    abi,
    address: contractAddress, // contract address
    functionName: "getCustomerOrders",
    account: "0x8aED64f26bA6eA4099E19108583817B6ba09Dcfb", // msg.sender
  });

  // console.log({ data, isLoading });

  return (
    <div>
      <ConnectWallet />
    </div>
  );
}

export default App;
