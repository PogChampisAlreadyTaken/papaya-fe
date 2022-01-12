import {
  Button,
  ButtonGroup,
  Divider,
  Fab,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {} from "@mui/lab/themeAugmentation";
import TimePicker from "@mui/lab/TimePicker";
import "react-phone-number-input/style.css";

import { getFreeTable } from "../../request/orderingSystem";
import OpeningHours from "./OpeningHours";
import {
  getDeliverTime,
  updateDeliverTime,
} from "../../request/userManagement";
import ActionYoutubeSearchedFor from "material-ui/svg-icons/action/youtube-searched-for";

export default function TimemanagerComponent() {
  const nav = useNavigate();
  const [deliverTime, setDeliverTime] = React.useState<string>("");
  const [showButton, setShowButton] = React.useState<boolean>(false);

  React.useEffect(() => {
    getDeliverTime().then((time) => {
      setDeliverTime(time.toString());
    });
  }, []);
  return (
    <div style={{ height: "300px" }}>
      <Paper style={{ backgroundColor: "#white", opacity: "95%" }}>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px", fontSize: "30px" }}>
          Zeitmanagement
        </Typography>
        <div style={{ height: "30px" }} />
        <Divider>Lieferzeit einstellen</Divider>
        <div style={{ height: "10px" }} />
        <TextField
          sx={{ fontStyle: { color: "red" } }}
          style={{ margin: "10px", font: "white" }}
          id="delivertime"
          label="in Minuten"
          variant="standard"
          type="Number"
          value={deliverTime}
          onChange={(deliverTime) => {
            setShowButton(true);
            setDeliverTime(deliverTime.currentTarget.value);
          }}
          onClick={() => setShowButton(true)}
        />
        <div style={{ height: "10px" }} />
        {showButton ? (
          <Button
            onClick={() => {
              const changedTime = parseInt(deliverTime);
              updateDeliverTime(changedTime);
              setShowButton(false);
            }}
          >
            Lieferzeit einstellen
          </Button>
        ) : (
          <div></div>
        )}
        <div style={{ height: "30px" }} />
        <Divider>Öffnungszeiten einstellen</Divider>
        <div style={{ height: "30px" }} />
        <OpeningHours />
      </Paper>
    </div>
  );
}
