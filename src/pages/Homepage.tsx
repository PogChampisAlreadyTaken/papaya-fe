// @flow
import { Typography } from "@mui/material";
import * as React from "react";
import { mealMangerUrl } from "../endpoints";
import logo from "../logo.svg";
import { getHelloMeal } from "../request/mealManger";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type Props = {};
export function Homepage(props: Props) {
  const [meal, setMeal] = React.useState("");
  const [order, setOrder] = React.useState("");
  const [user, setUser] = React.useState("");
  const [payment, setPayment] = React.useState("");

  React.useEffect(() => {
    const hello = getHelloMeal();
    hello.then((response) => {
      setMeal(response);
    });
  }, []);

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}