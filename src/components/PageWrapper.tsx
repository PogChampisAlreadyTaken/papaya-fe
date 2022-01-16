import React from "react";
import CustomChatbot from "./Chatbot/customChatbot";
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
        overflow: "auto",
        height: "calc(100% - 64px)",
      }}
    >
      {props.children}
      <MealBar />
      <CustomChatbot />
    </div>
  );
}
