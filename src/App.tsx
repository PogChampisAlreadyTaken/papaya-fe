import React from "react";
import "./App.css";
import { Typography } from "@mui/material";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar"
import MealBar from "./components/MealBar";
import Basket from "./components/Basket";

function App() {
  return (
    <div className="App">
      <AppBar/>

      <Homepage/>
    </div>
  );
}

export default App;
