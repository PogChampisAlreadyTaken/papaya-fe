// @flow
import { Typography } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router";
import useQuery from "../config/queryParams";
import { getHelloMeal } from "../request/mealManager";
import { getHelloOrder } from "../request/orderingSystem";
import { getHelloPayment } from "../request/paymentManager";
import { getHelloUser } from "../request/userManagement";

type Props = {};
export function MealOverview(props: Props) {
  const query = useQuery();
  const [meal, setMeal] = React.useState("");
  const [order, setOrder] = React.useState("");
  const [user, setUser] = React.useState("");
  const [payment, setPayment] = React.useState("");
  const loc = useLocation();
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

  React.useEffect(() => {
    console.log(query.get("category"));
  }, [loc.search, query]);

  return (
    <div>
      <Typography>{meal}</Typography>
      <Typography>{order}</Typography>
      <Typography>{user}</Typography>
      <Typography>{payment}</Typography>
    </div>
  );
}
