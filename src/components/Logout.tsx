import { signOut } from "@firebase/auth";
import { Button } from "@mui/material";

import React from "react";
import { auth } from "../config/Firebase-config";

import { OverlayContext } from "./context/overlayContext";

export default function Logout() {
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);

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
