import { Button } from "@mui/material";
import React from "react";
import { createClientMessage } from "react-chatbot-kit";
import { ActionProvider } from ".";

interface Props {
  actionProvider: ActionProvider;
  setState: any;
}

export default function InitialOptions(props: Props) {
  const { actionProvider, setState } = props;

  const options = [
    {
      text: "Lieferzeit",
      onClick: () => {
        const message = createClientMessage("Lieferzeit", {});

        setState((prevState: any) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
        actionProvider.handleDeliveryTime();
      },
    },
    {
      text: "Kontakt?",
      onClick: () => {
        const message = createClientMessage("Kontakt", {});

        setState((prevState: any) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
        actionProvider.handleContact();
      },
    },
    {
      text: "Öffnungszeiten?",
      onClick: () => {
        const message = createClientMessage("Öffnungszeiten", {});

        setState((prevState: any) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
        actionProvider.handleOpeningHours();
      },
    },
  ];
  return (
    <div>
      {options.map((option: any, index) => (
        <Button
          key={option.text + index}
          onClick={option.onClick}
          variant="contained"
          style={{ margin: "2px" }}
          sx={{ backgroundColor: "#515151f2" }}
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
}
