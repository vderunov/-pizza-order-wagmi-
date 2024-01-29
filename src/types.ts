interface Order {
  id: bigint;
  like: true;
  orderTime: bigint;
  pizzaType: string;
}

export type Orders = Order[];

export enum PizzaType {
  Margherita = "margherita",
  Pepperoni = "pepperoni",
  Cheese = "cheese",
}
