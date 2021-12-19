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

export default function Signup() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //handling input values
  const [registering, setRegistering] = useState<boolean>(false);
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerConfirm, setRegisterConfirm] = useState<string>("");
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

  React.useEffect(() => {
    console.log(error);
    if (error == "") {
      setOpen(false);
    }
  }, [error]);

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">
        Account erstellen
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrieren</DialogTitle>

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
            id="outlined-basic"
            label="E-Mail-Adresse"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
            id="outlined-basic"
            label="Passwort"
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <TextField
            onChange={(event) => {
              setRegisterConfirm(event.target.value);
            }}
            id="outlined-basic"
            label="Passwort wiederholen"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Divider>Lieferadresse</Divider>
          <div>
            <TextField
              onChange={(event) => {
                setRegisterStreet(event.target.value);
              }}
              id="outlined-basic"
              label="Straße"
              variant="outlined"
              margin="normal"
            />

            <TextField
              onChange={(event) => {
                setRegisterHousenumber(event.target.value);
              }}
              id="outlined-basic"
              label="Hausnummer"
              variant="outlined"
              margin="normal"
            />
          </div>
          <div>
            <TextField
              onChange={(event) => {
                setRegisterCity(event.target.value);
              }}
              id="outlined-basic"
              label="Stadt"
              variant="outlined"
              margin="normal"
            />
            <TextField
              onChange={(event) => {
                setRegisterZip(event.target.value);
              }}
              id="outlined-basic"
              label="Postleitzahl"
              variant="outlined"
              margin="normal"
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
                registerConfirm,
                registerStreet,
                registerHousenumber,
                registerZip,
                registerCity
              );

              setError(errorMessage);
              console.log(error);
            }}
            fullWidth
          >
            Registrieren
          </Button>

          <div style={{ height: 20 }} />
          <Typography style={{ color: "grey" }}>
            Beim Klicken auf "Absenden" erklärst Du Dich mit unseren{" "}
            <a href="#">AGB</a>,{" "}
            <a href="#">Geschäftsbedingungen zur Sammlung von Punkten</a>
            und <a href="#">Datenschutzerklärung</a> einverstanden.
          </Typography>

          <div style={{ height: 20 }} />
          <Button variant="outlined" onClick={handleClose} fullWidth>
            Bereits ein Account?
            {user ? user.email : null}
          </Button>
          <ErrorText error={error} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
