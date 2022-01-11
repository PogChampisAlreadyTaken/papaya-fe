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

export default function TimemanagerComponent() {
  const nav = useNavigate();
  const [deliverTime, setDeliverTime] = React.useState<String>("50");

  return (
    <div style={{ height: "300px" }}>
      <Paper style={{ backgroundColor: "#white", opacity: "95%" }}>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px", fontSize: "30px" }}>
          Zeitmanagement
        </Typography>
        <div style={{ height: "30px" }} />
        <Divider></Divider>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px" }}>
          Lieferzeit einstellen
        </Typography>
        <div style={{ height: "10px" }} />
        <TextField
          sx={{ fontStyle: { color: "red" } }}
          style={{ margin: "10px", font: "white" }}
          id="delivertime"
          label="Lieferzeit in Minuten"
          variant="standard"
          type="Number"
          value={deliverTime}
          onChange={(deliverTime) => {
            setDeliverTime(deliverTime.currentTarget.value);
          }}
        />
      </Paper>
    </div>
  );
}
