import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { LoginUser } from "../config/Firebase-auth";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //handling userinput
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [error, setError] = React.useState<string>("");

  //login with google
  const provider = new GoogleAuthProvider();

  //login with facebook
  const providerFacebook = new FacebookAuthProvider();

  const loginWithFacebook = async () => {
    const auth = getAuth();
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const login = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  React.useEffect(() => {
    console.log(error);
    if (error == "") {
      setOpen(false);
    }
  }, [error]);

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Anmelden</DialogTitle>

        <DialogContent>
          <IconButton
            onClick={handleClose}
            style={{ right: 10, top: 10, position: "absolute" }}
          >
            <CloseIcon />
          </IconButton>
          <Button onClick={login}>Mit Google anmelden</Button>
          <div>
            <Button onClick={loginWithFacebook}>Mit Facebook anmelden</Button>
          </div>
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
          />
          <div style={{ height: 20 }} />
          <Button
            variant="contained"
            onClick={() => {
              var errorMessage = LoginUser(loginEmail, loginPassword);

              setError(errorMessage);
              if (error == "") {
                handleClose();
              }
            }}
            fullWidth
          >
            Anmelden
          </Button>
          <div style={{ height: 20 }} />
          <Button variant="outlined" onClick={handleClose} fullWidth>
            Account erstellen?
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
