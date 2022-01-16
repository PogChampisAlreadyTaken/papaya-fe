import { Customer } from ".";
import { shoppingItem } from "./shoppingItem";

export interface Order{
    orderID?: number;
    customer?: Customer;
    shoppingItem: shoppingItem[];
    remarks: String;
}