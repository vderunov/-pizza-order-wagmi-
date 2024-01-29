import { ReactElement, useState } from "react";

import { toast } from "react-toastify";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

import pizzaOrderImg from "../assets/pizza-order.jpg";
import { abi, contractAddress } from "../constants";
import { PizzaType } from "../types";

interface CreateOrderProps {
  pizzaPrice?: string | null;
}

function CreateOrder({ pizzaPrice }: CreateOrderProps): ReactElement {
  const { writeContract, isPending } = useWriteContract();
  const [pizzaType, setPizzaType] = useState<PizzaType>(PizzaType.Margherita);

  return (
    <article>
      <div className="row">
        <img className="circle large" src={pizzaOrderImg} alt="pizza" />
        <div className="max">
          <h5>Choose Pizza Type</h5>
          <div className="field suffix border small">
            <select
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value as PizzaType)}
            >
              <option value={PizzaType.Pepperoni}>Pepperoni</option>
              <option value={PizzaType.Margherita}>Margherita</option>
              <option value={PizzaType.Cheese}>Cheese</option>
            </select>
            <i>arrow_drop_down</i>
          </div>
        </div>
      </div>
      <nav>
        {isPending || !pizzaPrice ? (
          <progress className="circle small"></progress>
        ) : (
          <button
            onClick={() =>
              writeContract(
                {
                  abi,
                  address: contractAddress,
                  functionName: "createOrder",
                  args: [pizzaType],
                  value: parseEther(pizzaPrice),
                },
                {
                  onError() {
                    toast.info("Error in transaction");
                  },
                },
              )
            }
            disabled={isPending}
          >
            Order Pizza
          </button>
        )}
      </nav>
    </article>
  );
}

export default CreateOrder;
