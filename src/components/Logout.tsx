import { signOut } from "@firebase/auth";
import { Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";

import React from "react";
import { auth } from "../config/Firebase-config";

import { OverlayContext } from "./context/overlayContext";

export default function Logout() {
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { keycloak, initialized } = useKeycloak();

  const logout = async () => {
    setOverlayContext({
      ...overlayContext,
      openMessage: true,
      message: "Erfolgreich ausgeloggt",
    });
    console.log(keycloak);

    keycloak.logout();
    //await signOut(auth).then((result) => {});
  };

  return (
    <div>
      <Button onClick={logout} color="inherit">
        Ausloggen
      </Button>
    </div>
  );
}
