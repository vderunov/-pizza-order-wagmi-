import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { ToastContainer } from "react-toastify";
import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { sepolia } from "wagmi/chains";

import ethereumImg from "./assets/ethereum.png";
import { CreateOrder, ChangePizzaPrice, PreviousOrders } from "./components";
import { abi, contractAddress } from "./constants";
import { Orders } from "./types.ts";
import { shortenAddress, sortOrders } from "./utils";

export const config: any = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia],
});

function App() {
  const { address } = useAccount();

  const { data: pizzaPrice, isLoading: isPizzaPriceLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "pizzaPrice",
  });

  const { data: orders = [], isLoading: isOrdersLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getCustomerOrders",
    account: address,
  });

  return (
    <>
      <header>
        <nav>
          <h5 className="max center-align">
            Ethereum Pet Project: rainbowkit + viem + wagmi
          </h5>
          <ConnectButton />
        </nav>
      </header>
      <main className="responsive">
        <h1 className="center-align">Pizza Order</h1>
        <div className="row">
          <article>
            <div className="row">
              <img className="circle large" src={ethereumImg} alt="ethereum" />
              <div className="max">
                <h5>Ethereum</h5>
                <p>
                  Your current account:{" "}
                  {address ? shortenAddress(address) : null}
                </p>
              </div>
            </div>
          </article>
          <article>
            <h5>The price of the pizza</h5>
            {isPizzaPriceLoading ? (
              <progress className="circle small"></progress>
            ) : (
              <p>{formatEther(pizzaPrice as bigint)}</p>
            )}
          </article>
        </div>
        <div className="large-divider"></div>
        <div className="row">
          <CreateOrder
            pizzaPrice={pizzaPrice ? formatEther(pizzaPrice as bigint) : null}
          />
          <ChangePizzaPrice />
        </div>
        <div className="large-divider"></div>
        <PreviousOrders
          orders={sortOrders(orders as Orders)}
          isLoading={isOrdersLoading}
        />
      </main>
      <ToastContainer progressStyle={{ background: "var(--primary)" }} />
    </>
  );
}

export default App;
