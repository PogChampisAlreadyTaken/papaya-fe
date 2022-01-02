import { signOut } from "@firebase/auth";
import { Alert, Button, Dialog, DialogTitle, IconButton } from "@mui/material";

import React from "react";
import { auth } from "../config/Firebase-config";

import ActionOpenWith from "material-ui/svg-icons/action/open-with";
import { OverlayContext } from "./context/overlayContext";

export default function Logout() {
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { openOverlay, message, openMessage } = overlayContext;

  const logout = async () => {
    setOverlayContext({
      ...overlayContext,
      openMessage: true,
      message: "Erfolgreich ausgeloggt",
    });
    console.log(auth.currentUser);
    await signOut(auth).then((result) => {});
  };

  return (
    <div>
      <Button onClick={logout} color="inherit">
        Ausloggen
      </Button>
    </div>
  );
}
