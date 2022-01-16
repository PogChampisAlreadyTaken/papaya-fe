import * as React from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Chatbot from "react-chatbot-kit";
import { IconButton } from "@mui/material";
import { ActionProvider, config, MessageParser } from ".";
import { makeStyles } from "@material-ui/core/styles";
import "react-chatbot-kit/build/main.css";
import "./chatbot.css";

export default function CustomChatbot() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div
      style={{
        position: "fixed",
        right: "4%",
        bottom: 20,
      }}
    >
      {open && (
        <div
          style={{
            color: "white",
            maxWidth: "250px",
          }}
        >
          <Chatbot
            config={config}
            placeholderText="Frag mich etwas..."
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      )}

      <IconButton className={classes.icon} onClick={() => setOpen(!open)}>
        <SmartToyIcon style={{ fill: "white" }} />
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    "& svg": {
      fontSize: 50,
    },
    float: "right",
  },
}));
