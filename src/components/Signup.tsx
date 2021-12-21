import * as React from "react";
import { useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/Firebase-config";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";
import ErrorText from "./ErrorText/Error";
import { RegisterUser } from "../config/Firebase-auth";
import { Login } from "@mui/icons-material";

interface props {
  handleLogin: () => void;
  handleClose: () => void;
}

export default function Signup(props: props) {
  const { handleLogin, handleClose } = props;

  //handling input values
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerConfirm, setRegisterConfirm] = useState<string>("");
  const [registerFirstName, setRegisterFirstName] = useState<string>("");
  const [registerLastName, setRegisterLastName] = useState<string>("");
  const [registerStreet, setRegisterStreet] = useState<string>("");
  const [registerHousenumber, setRegisterHousenumber] = useState<string>("");
  const [registerZip, setRegisterZip] = useState<string>("");
  const [registerCity, setRegisterCity] = useState<string>("");
  const [error, setError] = useState<string>("");
  //handle user
  const [user, setUser] = useState<User | undefined>(undefined);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });

  return (
    <DialogContent>
      <IconButton
        onClick={handleClose}
        style={{ right: 10, top: 10, position: "absolute" }}
      >
        <CloseIcon />
      </IconButton>
      <Button onClick={handleClose}>Mit Google anmelden</Button>
      <div>
        <Button onClick={handleClose}>Mit Facebook anmelden</Button>
      </div>
      <Divider>oder</Divider>
      <div style={{ height: 30 }} />
      <TextField
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
        required
        id="email"
        label="E-Mail-Adresse"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        onChange={(event) => {
          setRegisterFirstName(event.target.value);
        }}
        required
        id="first-name"
        label="Vorname"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        onChange={(event) => {
          setRegisterLastName(event.target.value);
        }}
        required
        id="last-name"
        label="Nachname"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
        required
        id="password"
        label="Passwort"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
      />

      <TextField
        onChange={(event) => {
          setRegisterConfirm(event.target.value);
        }}
        required
        id="password-confirm"
        label="Passwort wiederholen"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
      />
      <Divider>Lieferadresse</Divider>
      <div>
        <TextField
          onChange={(event) => {
            setRegisterStreet(event.target.value);
          }}
          required
          id="street"
          label="Straße"
          variant="outlined"
          margin="normal"
        />

        <TextField
          onChange={(event) => {
            setRegisterHousenumber(event.target.value);
          }}
          required
          id="house-number"
          label="Hausnummer"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </div>
      <div>
        <TextField
          onChange={(event) => {
            setRegisterCity(event.target.value);
          }}
          required
          id="city"
          label="Stadt"
          variant="outlined"
          margin="normal"
        />
        <TextField
          onChange={(event) => {
            setRegisterZip(event.target.value);
          }}
          required
          id="zip"
          label="Postleitzahl"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </div>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="Erhalte Rabatte, Treueangebote und andere Updates."
        />
      </FormGroup>
      <div style={{ height: 20 }} />
      <Button
        variant="contained"
        onClick={() => {
          var errorMessage = RegisterUser(
            registerEmail,
            registerPassword,
            registerFirstName,
            registerLastName,
            registerConfirm,
            registerStreet,
            registerHousenumber,
            registerZip,
            registerCity
          );

          setError(errorMessage);
          console.log(error);

          handleLogin();
        }}
        fullWidth
      >
        Registrieren
      </Button>

      <div style={{ height: 20 }} />
      <Typography style={{ color: "grey" }}>
        Beim Klicken auf "Absenden" erklärst Du Dich mit unseren{" "}
        <a href="https://www.youtube.com/watch?v=GntuIA7H40c&ab_channel=sevDesk">
          AGB
        </a>
        ,{" "}
        <a href="https://www.youtube.com/watch?v=GntuIA7H40c&ab_channel=sevDesk">
          Geschäftsbedingungen zur Sammlung von Punkten
        </a>
        und{" "}
        <a href="https://www.youtube.com/watch?v=GntuIA7H40c&ab_channel=sevDesk">
          Datenschutzerklärung
        </a>{" "}
        einverstanden.
      </Typography>

      <div style={{ height: 20 }} />
      <Button variant="outlined" onClick={handleLogin} fullWidth>
        Bereits ein Account?
        {user ? user.email : null}
      </Button>
      <ErrorText error={error} />
    </DialogContent>
  );
}
