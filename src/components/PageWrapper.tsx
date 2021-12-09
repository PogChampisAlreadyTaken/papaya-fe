import React from "react";
import MealBar from "./MealBar";

interface props {}

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