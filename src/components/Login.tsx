import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import {
  LoginUser,
  LoginUserWithFacebook,
  LoginWithGoogle,
} from "../config/Firebase-auth";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { OverlayContext } from "./context/overlayContext";

interface props {
  handleLogin: () => void;
}

export default function Login(props: props) {
  const { handleLogin } = props;

  //handling userinput
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [error, setError] = React.useState<string>("");

  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);

  return (
    <DialogContent>
      <IconButton
        onClick={() =>
          setOverlayContext({ ...overlayContext, openOverlay: false })
        }
        style={{ right: 10, top: 10, position: "absolute" }}
      >
        <CloseIcon />
      </IconButton>
      <GoogleLoginButton
        onClick={() => {
          LoginWithGoogle({
            setOpen: (bool: boolean) =>
              setOverlayContext({
                openOverlay: bool,
                message: "Erfolgreich eingeloggt",
                openMessage: true,
              }),
          });
        }}
      >
        <span>Mit Google anmelden</span>
      </GoogleLoginButton>
      <div style={{ height: 5 }} />
      <div>
        <FacebookLoginButton
          onClick={() => {
            LoginUserWithFacebook({
              setOpen: (bool: boolean) =>
                setOverlayContext({
                  openOverlay: bool,
                  message: "Erfolgreich eingeloggt",
                  openMessage: true,
                }),
            });
          }}
        >
          <span>Mit Facebook anmelden</span>
        </FacebookLoginButton>
      </div>
      <div style={{ height: 30 }} />
      <Divider>oder</Divider>
      <div style={{ height: 30 }} />
      <TextField
        onChange={(event) => {
          setLoginEmail(event.target.value);
        }}
        id="outlined-basic"
        label="E-Mail-Adresse"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        onChange={(event) => {
          setLoginPassword(event.target.value);
        }}
        id="outlined-basic"
        label="Passwort"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
      />
      <div style={{ height: 20 }} />
      <Button
        variant="contained"
        onClick={() => {
          var errorMessage = LoginUser(loginEmail, loginPassword);

          setError(errorMessage);
          if (error === "") {
            setOverlayContext({
              openOverlay: false,
              message: "Erfolgreich eingeloggt",
              openMessage: true,
            });
          }
        }}
        fullWidth
      >
        Anmelden
      </Button>
      <div style={{ height: 20 }} />
      <Button variant="outlined" onClick={handleLogin} fullWidth>
        Account erstellen?
      </Button>
    </DialogContent>
  );
}
