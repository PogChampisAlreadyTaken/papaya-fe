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

    getHelloOrder().then((response) => {
      setOrder(response);
    });

    getHelloUser().then((response) => {
      setUser(response);
    });

    getHelloPayment().then((response) => {
      setPayment(response);
    });
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Typography>{meal}</Typography>
      <Typography>{order}</Typography>
      <Typography>{user}</Typography>
      <Typography>{payment}</Typography>
    </div>
  );
}
