import { Dialog, DialogTitle } from "@mui/material";

import * as React from "react";
import { OverlayContext } from "./context/overlayContext";
import Login from "./Login";
import Signup from "./Signup";

export default function UserOverlay() {
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const handleClose = () =>
    setOverlayContext({ ...overlayContext, openOverlay: false });
  const handleLogin = () => setIsLogin(!isLogin);
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { openOverlay } = overlayContext;

  return (
    <div>
      <Dialog open={openOverlay} onClose={handleClose}>
        <DialogTitle>{isLogin ? "Anmelden" : "Registrierung"}</DialogTitle>
        {isLogin ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <Signup handleClose={handleClose} handleLogin={handleLogin} />
        )}
      </Dialog>
    </div>
  );
}
