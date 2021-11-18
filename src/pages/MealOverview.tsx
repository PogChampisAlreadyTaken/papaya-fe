// @flow
import { Typography } from "@mui/material";
import * as React from "react";
import { mealMangerUrl } from "../endpoints";
import logo from "../logo.svg";
import { getHello } from "../request/mealManger";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type Props = {};
export function MealOverview(props: Props) {
  const [meal, setMeal] = React.useState("");
  const [order, setOrder] = React.useState("");
  const [user, setUser] = React.useState("");
  const [payment, setPayment] = React.useState("");

  React.useEffect(() => {
    const hello = getHello();
    hello.then((response) => {
      setMeal(response);
    });
  }, []);

  return (
    <div>
      <Typography>{meal}</Typography>
    </div>
  );
}
