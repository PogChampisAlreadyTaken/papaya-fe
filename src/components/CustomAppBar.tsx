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

export default function CustomAppBar() {
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log(auth.currentUser);
  }, [auth.currentUser]);

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
          {!auth.currentUser ? (
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
