import * as React from "react";
import { Order } from "../../model";

type Dispatch = (orders: Order) => void;
type State = Order;

export const OrderContext = React.createContext<[State, Dispatch]>([
    {
        shoppingItem:[],
    },
  () => {},
]);
