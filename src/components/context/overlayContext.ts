import * as React from "react";
import { Meal } from "../../model";

type Dispatch = (setState: State) => void;
type State = { openOverlay: boolean; message: string; openMessage: boolean };

export const OverlayContext = React.createContext<[State, Dispatch]>([
  { openOverlay: false, message: "", openMessage: false },
  () => {},
]);
