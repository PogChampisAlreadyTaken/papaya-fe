import * as React from "react";
import { Customer } from "../../model";

const MealContext = React.createContext<Customer | null>(null);
