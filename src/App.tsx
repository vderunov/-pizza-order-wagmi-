import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";

import { abi } from "./services/abi.ts";

export const contractAddress = "0x241365cdF78Ea0b527a4BcD7CEeb8eB10B930E5a";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const { data, isLoading } = useReadContract({
    abi,
    address: contractAddress, // contract address
    functionName: "getCustomerOrders",
    account: "0x8aED64f26bA6eA4099E19108583817B6ba09Dcfb", // msg.sender
  });

  console.log({ data, isLoading });

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;
