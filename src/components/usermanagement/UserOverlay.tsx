import { Dialog, DialogTitle } from "@mui/material";
import * as React from "react";
import { OverlayContext } from "../context/overlayContext";
import Address from "./Address";
import ProfileOverview from "./ProfileOverview";

export default function UserOverlay() {
  const [isAddingAddress, setIsAddingAddress] = React.useState<boolean>(false);
  const handleClose = () =>
    setOverlayContext({ ...overlayContext, open: false });
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { open } = overlayContext;

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOverlayContext({ ...overlayContext, open: false });
        }}
        style={{ textAlign: "center", background: "#282c34f0" }}
      >
        <DialogTitle
          style={{ background: "#282c34f0", fontWeight: "bold", color: "#fff" }}
        >
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
