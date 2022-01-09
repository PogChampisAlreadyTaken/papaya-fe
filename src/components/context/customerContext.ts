import * as React from "react";
import { Customer } from "../../model";

type Dispatch = (setState: State) => void;
type State = Customer | undefined ;

export const CustomerContext = React.createContext<[State, Dispatch]>([
  undefined,
  () => {},
]);
