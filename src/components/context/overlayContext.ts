import * as React from "react";

type Dispatch = (setState: State) => void;
type State = { open: boolean; message: string; openMessage: boolean };

export const OverlayContext = React.createContext<[State, Dispatch]>([
  { open: false, message: "", openMessage: false },
  () => {},
]);
