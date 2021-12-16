import React from "react";
import { Meal } from "../model";
import MealBar from "./MealBar";
import AppBar from "../components/CustomAppBar";

interface props {}

const MealContext = React.createContext<Meal[]>([]);

export default function PageWrapper(props: React.PropsWithChildren<props>) {
  return (
    <div
      style={{
        position: "fixed",
        top: 64,
        left: 240,
        width: "calc(100% - 240px)",
        height: "100%",
      }}
    >
      {props.children}
      <MealBar />
    </div>
  );
}
