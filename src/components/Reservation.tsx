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
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {} from "@mui/lab/themeAugmentation";
import { createTheme, fontSize } from "@mui/system";
import "../helpers/calender-style.css";
import StaticDateTimePicker from "@mui/lab/StaticDateTimePicker";
import TimePicker from "@mui/lab/TimePicker";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import NavigationIcon from "@mui/icons-material/Navigation";
import { getFreeTable } from "../request/orderingSystem";

export default function Reservation() {
  const nav = useNavigate();
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [time, setTime] = React.useState<Date | null>(new Date());
  const [mergedTime, setMergedTime] = React.useState<Date>(new Date());
  const [people, setPeople] = React.useState("4");
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhonenumber] = React.useState<String>();
  const [isFree, setIsFree] = React.useState<boolean>(false);
  const [showFeedback, setShowFeedback] = React.useState<boolean>(false);
  const [tableId, setTableId] = React.useState<number>();

  return (
    <div style={{ height: "300px" }}>
      <Paper style={{ backgroundColor: "#white", opacity: "95%" }}>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px", fontSize: "30px" }}>
          Tisch reservieren
        </Typography>
        <div style={{ height: "30px" }} />
        <Divider></Divider>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px" }}>
          Wie viele Personen seid ihr?
        </Typography>
        <div style={{ height: "10px" }} />
        <TextField
          sx={{ fontStyle: { color: "red" } }}
          style={{ margin: "10px", font: "white" }}
          id="people"
          label="Personenanzahl"
          variant="standard"
          type="Number"
          value={people}
          onChange={(people) => {
            setPeople(people.currentTarget.value);
          }}
        />
        <div style={{ height: "20px" }} />
        <Typography style={{ margin: "10px" }}>
          Wann möchtest du bei uns vorbei schauen?
        </Typography>
        <div style={{ height: "20px" }} />
        <DatePicker
          label="Datum"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Uhrzeit"
          value={time}
          onChange={(time) => {
            setTime(time);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <div style={{ height: "20px" }} />
        <div>
          <Button
            onClick={() => {
              if (date != undefined && time != undefined) {
                const newMergedTime = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  time.getHours(),
                  time.getMinutes(),
                  time.getSeconds()
                );
                setMergedTime(newMergedTime);

                getFreeTable(newMergedTime.getTime()).then((response) => {
                  console.log(response);
                  if (response != null) {
                    setIsFree(true);
                    setTableId(response);
                  }
                });
              }
              setShowFeedback(true);
            }}
          >
            Tisch finden
          </Button>
          {showFeedback ? (
            <Typography>
              {isFree
                ? "Wir haben einen Tisch für dich gefunden"
                : "Wir haben leider zu dieser Uhrzeit keinen Tisch mehr frei. Bitte wähle einen andere Uhrzeit"}
            </Typography>
          ) : (
            <></>
          )}
        </div>
        <div style={{ height: "20px" }} />
        {isFree ? (
          <>
            <Typography style={{ margin: "10px" }}>
              Möchtest du diesen Tisch reservieren?
            </Typography>
            <TextField
              sx={{ fontStyle: { color: "red" } }}
              style={{ margin: "10px", font: "white" }}
              id="name"
              label="Name"
              variant="standard"
              value={name}
              onChange={(name) => {
                setName(name.currentTarget.value);
              }}
            />
            <TextField
              sx={{ fontStyle: { color: "red" } }}
              style={{ margin: "10px", font: "white" }}
              id="Telefonnummer"
              label="Telefonnummer"
              variant="standard"
              value={name}
              onChange={(phoneNumber) => {
                setName(phoneNumber.currentTarget.value);
              }}
            />
            <div>
              <Button
                onClick={() => {
                  console.log(mergedTime);
                  console.log("Tag und Uhrzeit: " + date);
                  console.log("Personenanzahl: " + people);
                  nav("/");
                }}
              >
                Tisch reservieren
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </Paper>
    </div>
  );
}
