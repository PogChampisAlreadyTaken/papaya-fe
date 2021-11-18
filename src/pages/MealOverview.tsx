// @flow
import { Typography } from "@mui/material";
import * as React from "react";
import { getHelloMeal } from "../request/mealManger";
import { getHelloOrder } from "../request/orderingSystem";
import { getHelloPayment } from "../request/paymentManger";
import { getHelloUser } from "../request/userManagement";

type Props = {};
export function MealOverview(props: Props) {
  const [meal, setMeal] = React.useState("");
  const [order, setOrder] = React.useState("");
  const [user, setUser] = React.useState("");
  const [payment, setPayment] = React.useState("");

  React.useEffect(() => {
    const hello = getHelloMeal();
    hello.then((response) => {
      setMeal(response);
    });

    const helloOrderingSystem = getHelloOrder();
    helloOrderingSystem.then((response) => {
      setOrder(response);
    });

    const helloUser = getHelloUser();
    helloUser.then((response) => {
      setUser(response);
    });

    const helloPayment = getHelloPayment();
    helloPayment.then((response) => {
      setPayment(response);
    });
  }, []);

  return (
    <div>
      <Typography>{meal}</Typography>
      <Typography>{order}</Typography>
      <Typography>{user}</Typography>
      <Typography>{payment}</Typography>
    </div>
  );
}
