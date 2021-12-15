import * as React from "react";
import { Meal } from "../../model";

type Dispatch = (meals: Meal[]) => void;
type State = Meal[];

export const MealContext = React.createContext<[State, Dispatch]>([
  [],
  () => {},
]);
