import { Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { OverlayContext } from "./context/overlayContext";

export default function Logout() {
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { keycloak } = useKeycloak();

  const logout = async () => {
    setOverlayContext({
      ...overlayContext,
      openMessage: true,
      message: "Erfolgreich ausgeloggt",
    });

    keycloak.logout();
  };

  return (
    <div>
      <Button onClick={logout} color="inherit">
        Ausloggen
      </Button>
    </div>
  );
}
