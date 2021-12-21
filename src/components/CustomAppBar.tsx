import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Basket from "./Basket";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";
import UserOverlay from "./UserOverlay";
import { auth } from "../config/Firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";

export default function CustomAppBar() {
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | undefined>(undefined);

  React.useEffect(() => {
    console.log(auth.currentUser);
  }, [auth.currentUser]);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }else{
      setUser(undefined)
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        sx={{
          top: 0,
          left: 0,
        }}
        color="primary"
      >
        {show && <Basket />}

        <Toolbar>
          <Button
            color="inherit"
            style={{ float: "right" }}
            onClick={() => {
              setShow(!show);
            }}
          >
            Warenkorb
          </Button>
          {open ? <UserOverlay open={open} setOpen={setOpen} /> : <div />}
          {user == null ? (
            <Button onClick={() => setOpen(true)} color="inherit">
              Login
            </Button>
          ) : (
            <Logout />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
