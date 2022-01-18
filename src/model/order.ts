import { Customer } from ".";
import { ShoppingItem } from "./shoppingItem";

export interface Order{
    orderID?: number;
    customer?: string;
    shoppingItem: ShoppingItem[];
}