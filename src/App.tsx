import React from "react";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import MealBar from "./components/MealBar";

function App() {
  return (
    <div className="App">
      <AppBar />
      <MealBar />
      <Homepage />
    </div>
  );
}

export default App;
