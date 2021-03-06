import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import React from "react";
import { useNavigate } from "react-router-dom";
import type {} from "@mui/lab/themeAugmentation";
import TimePicker from "@mui/lab/TimePicker";
import { getFreeTable, postReservation } from "../request/orderingSystem";
import { OverlayContext } from "./context/overlayContext";

export default function Reservation() {
  const nav = useNavigate();
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [time, setTime] = React.useState<Date | null>(new Date());
  const [mergedTime, setMergedTime] = React.useState<number>(0);
  const [people, setPeople] = React.useState("4");
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhonenumber] = React.useState<string>("");
  const [isFree, setIsFree] = React.useState<boolean>(false);
  const [showFeedback, setShowFeedback] = React.useState<boolean>(false);
  const [tableId, setTableId] = React.useState<number>(0);
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);

  return (
    <div style={{ height: "300px" }}>
      <Paper style={{ backgroundColor: "#2c2f32", opacity: "95%" }}>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px", fontSize: "40px", color: "#fff" }}>
          Tisch reservieren
        </Typography>
        <div style={{ height: "30px" }} />
        <Divider></Divider>
        <div style={{ height: "30px" }} />
        <Typography
          style={{ margin: "10px", color: "#fff", fontWeight: "bold" }}
        >
          Wie viele Personen seid ihr?
        </Typography>
        <div style={{ height: "10px" }} />
        <TextField
          InputLabelProps={{
            style: { color: "#fff", fontWeight: "bold" },
          }}
          InputProps={{
            style: { color: "#fff", fontWeight: "bold" },
          }}
          sx={{ fontStyle: { color: "red" }, fontWeight: "bold" }}
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
        <Typography
          style={{ margin: "10px", color: "#fff", fontWeight: "bold" }}
        >
          Wann m??chtest du bei uns vorbei schauen?
        </Typography>
        <div style={{ height: "20px" }} />
        <DatePicker
          InputProps={{
            style: { color: "#fff", fontWeight: "bold" },
          }}
          label="Datum"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontWeight: "bold" },
              }}
              {...params}
            />
          )}
        />
        <TimePicker
          InputProps={{
            style: { color: "#fff", fontWeight: "bold" },
          }}
          label="Uhrzeit"
          value={time}
          onChange={(time) => {
            setTime(time);
          }}
          renderInput={(params) => (
            <TextField
              InputLabelProps={{
                style: { color: "#fff", fontWeight: "bold" },
              }}
              {...params}
            />
          )}
        />
        <div style={{ height: "20px" }} />
        <div>
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            variant="outlined"
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
                setMergedTime(newMergedTime.getTime());

                getFreeTable(newMergedTime.getTime(), parseInt(people)).then(
                  (response) => {
                    if (response != null) {
                      setIsFree(true);
                      setTableId(response);
                    }
                  }
                );
              }
              setShowFeedback(true);
            }}
          >
            Tisch finden
          </Button>
          {showFeedback ? (
            <Typography style={{ color: "#fff" }}>
              {isFree
                ? "Wir haben einen Tisch f??r dich gefunden"
                : "Wir haben leider zu dieser Uhrzeit keinen Tisch mehr frei. Bitte w??hle einen andere Uhrzeit"}
            </Typography>
          ) : (
            <></>
          )}
        </div>
        <div style={{ height: "20px" }} />
        {isFree ? (
          <>
            <Typography style={{ margin: "10px", color: "#fff" }}>
              M??chtest du diesen Tisch reservieren?
            </Typography>
            <TextField
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              InputProps={{
                style: { color: "#fff" },
              }}
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
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{ fontStyle: { color: "red" } }}
              style={{ margin: "10px", font: "white" }}
              id="Telefonnummer"
              label="Telefonnummer"
              variant="standard"
              value={phoneNumber}
              onChange={(phoneNumber) => {
                setPhonenumber(phoneNumber.currentTarget.value);
              }}
            />
            <div>
              <Button
                sx={{
                  color: "white",
                  borderColor: "white",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                variant="outlined"
                onClick={() => {
                  postReservation({
                    phonenumber: phoneNumber,
                    tableid: tableId,
                    name: name,
                    reservationDate: mergedTime,
                  }).then((response) => {
                    //response abfrage, because show successfull reservation
                    if (response.status === 200) {
                      setOverlayContext({
                        ...overlayContext,
                        message: "Erfolgreich reserviert",
                        openMessage: true,
                      });
                      nav("/");
                    }
                  });
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
