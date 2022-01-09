import { Dialog, DialogTitle } from "@mui/material";

import * as React from "react";
import keycloak from "../../keycloak";
import { OverlayContext } from "../context/overlayContext";
import Address from "./Address";
import ProfileOverview from "./ProfileOverview";

export default function UserOverlay() {
  const [isAddingAddress, setIsAddingAddress] = React.useState<boolean>(false);
  const handleClose = () =>
    setOverlayContext({ ...overlayContext, open: false });
  const handleAddingAddress = () => setIsAddingAddress(!isAddingAddress);
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { open } = overlayContext;

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOverlayContext({ ...overlayContext, open: false });
        }}
        style={{ textAlign: "center" }}
      >
        <DialogTitle>
          {isAddingAddress ? "Adresse hinzufügen" : "Profil"}
        </DialogTitle>
        {isAddingAddress ? (
          <Address
            setIsAddingAddress={setIsAddingAddress}
            handleClose={handleClose}
          />
        ) : (
          <ProfileOverview
            handleClose={handleClose}
            setIsAddingAddress={setIsAddingAddress}
          />
        )}
      </Dialog>
    </div>
  );
}
