import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Basket from "./Basket";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";

export default function CustomAppBar() {
  const [show, setShow] = React.useState(false);
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        classes={{ root: classes.appBar }}
        sx={{
          zIndex: 1400,
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
          <Login />
          <Signup />
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#2d3134f2!important",
  },
});
