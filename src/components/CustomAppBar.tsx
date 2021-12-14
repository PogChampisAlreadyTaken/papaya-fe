import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Basket from "./Basket";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";

export default function CustomAppBar() {
  const [show, setShow] = React.useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        sx={{
          zIndex: 1400,
        }}
        color="secondary"
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
          <Login />
          <Signup />
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
