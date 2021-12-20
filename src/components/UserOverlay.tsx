import { Dialog, DialogTitle } from "@mui/material";

import * as React from "react";
import Login from "./Login";
import Signup from "./Signup";

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function UserOverlay(props: props) {
  const { open, setOpen } = props;

  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const handleClose = () => setOpen(false);
  const handleLogin = () => setIsLogin(!isLogin);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}  >
        <DialogTitle>{isLogin ? "Anmelden" : "Registrierung"}</DialogTitle>
        {isLogin ? (
          <Login handleClose={handleClose} handleLogin={handleLogin} />
        ) : (
          <Signup handleClose={handleClose} handleLogin={handleLogin} />
        )}
      </Dialog>
    </div>
  );
}
