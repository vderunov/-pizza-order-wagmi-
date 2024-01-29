import { ReactElement, useState } from "react";

import { toast } from "react-toastify";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

import { abi, contractAddress } from "../constants";

function ChangePizzaPrice(): ReactElement {
  const { writeContract, isPending } = useWriteContract();
  const [pizzaPriceInputValue, setPizzaPriceInputValue] = useState("");

  const handleClick = () => {
    writeContract(
      {
        abi,
        address: contractAddress,
        functionName: "changePizzaPrice",
        args: [parseEther(pizzaPriceInputValue)],
      },
      {
        onError(error: any) {
          toast.info("Error in transaction");
          console.error(`Error in transaction: ${error}`);
        },
      },
    );
  };

  return (
    <article>
      <div className="row">
        <div className="max">
          <h5>
            Change pizza price (<em>Only the owner</em>)
          </h5>
          <div className="field border">
            <input
              type="number"
              placeholder="Amount (ETH)"
              step="0.001"
              value={pizzaPriceInputValue}
              onChange={(e) => setPizzaPriceInputValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <nav>
        {isPending ? (
          <progress className="circle small"></progress>
        ) : (
          <button onClick={handleClick} disabled={!pizzaPriceInputValue}>
            Change Price
          </button>
        )}
      </nav>
    </article>
  );
}

export default ChangePizzaPrice;
