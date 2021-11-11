// @flow
import { Typography } from "@mui/material";
import * as React from "react";
import MealBar from "../components/MealBar";
import logo from "../logo.svg";

type Props = {};
export function Homepage(props: Props) {
  return (
    <div>

      <MealBar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>pewpew</p>
        <p>pewpew</p>
        <Typography variant="h1" component="h2">
          uwu qwq
        </Typography>

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
