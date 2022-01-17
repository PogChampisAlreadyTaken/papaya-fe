import * as React from "react";
import { Address } from "../../model";

type Dispatch = (setState: State) => void;
type State = Address;

export const AddressContext = React.createContext<[State, Dispatch]>([
  { city: "", house_number: "", street: "", zip: "" },
  () => {},
]);
