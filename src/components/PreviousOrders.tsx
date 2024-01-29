import { ReactElement, useState } from "react";

import { toast } from "react-toastify";
import { useWriteContract } from "wagmi";

import heartRegular from "../assets/heart-regular.svg";
import heartSolid from "../assets/heart-solid.svg";
import { abi, contractAddress } from "../constants";
import { Orders } from "../types.ts";

const renderHeartIcon = (
  like: boolean,
  id: bigint | null,
  currentlyLikingOrderId: bigint | null,
  handleClick: (id: bigint | null) => void,
  isPending: boolean,
): ReactElement => {
  if (like) {
    return <img src={heartSolid} alt="heart" width="16px" />;
  }

  if (currentlyLikingOrderId === id || isPending) {
    return <progress className="circle small"></progress>;
  }

  return (
    <a onClick={() => handleClick(id)}>
      <img src={heartRegular} alt="heart" width="16px" />
    </a>
  );
};

const OrdersList = ({
  orders,
  handleClick,
  currentlyLikingOrderId,
  isPending,
}: {
  orders: Orders;
  handleClick: (id: bigint | null) => void;
  currentlyLikingOrderId: bigint | null;
  isPending: boolean;
}): ReactElement | ReactElement[] => {
  if (!orders.length) {
    return <p>The order list is empty</p>;
  }

  return orders.map(({ pizzaType, like, id }, index) => {
    const heartIcon = renderHeartIcon(
      like,
      id,
      currentlyLikingOrderId,
      handleClick,
      isPending,
    );

    return (
      <div key={index}>
        <div className="row">
          <div className="max">{pizzaType}</div>
          {heartIcon}
        </div>
        {orders.length - 1 !== index && <div className="small-divider"></div>}
      </div>
    );
  });
};

interface PreviousOrdersProps {
  orders: Orders;
  isLoading: boolean;
}

const PreviousOrders = ({
  orders,
  isLoading,
}: PreviousOrdersProps): ReactElement => {
  const { writeContract, isPending } = useWriteContract();
  // TODO: use or delete
  const [currentlyLikingOrderId] = useState<bigint | null>(null);

  const handleClick = (id: bigint | null) => {
    writeContract(
      {
        abi,
        address: contractAddress,
        functionName: "likePizza",
        args: [id],
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
    <div className="grid">
      <div
        className="s4 padding"
        style={{
          background: "var(--surface-container-low",
          borderRadius: "12px",
          boxShadow: "var(--elevate1)",
        }}
      >
        <h3>Previous orders:</h3>
        {isLoading ? (
          <progress className="circle small"></progress>
        ) : (
          <OrdersList
            orders={orders}
            handleClick={handleClick}
            currentlyLikingOrderId={currentlyLikingOrderId}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default PreviousOrders;
