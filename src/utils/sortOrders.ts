import { Orders } from "../types.ts";

export const sortOrders = (orders: Orders): Orders =>
  [...orders].sort((a, b) => {
    if (a.orderTime < b.orderTime) {
      return 1;
    } else if (a.orderTime > b.orderTime) {
      return -1;
    } else {
      return 0;
    }
  });
