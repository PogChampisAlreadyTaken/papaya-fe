import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Basket from "./Basket";
import Logout from "./Logout";
import UserOverlay from "./UserOverlay";
import { auth } from "../config/Firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { OverlayContext } from "./context/overlayContext";
import { Customer } from "../model";
import { CustomerContext } from "./context/customerContext";
import { useKeycloak } from "@react-keycloak/web";

export default function CustomAppBar() {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [customerContext, setCustomerContext] =
    React.useContext(CustomerContext);
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { openOverlay, message, openMessage } = overlayContext;
  const { keycloak, initialized } = useKeycloak();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(undefined);
    }
  });
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        classes={{ root: classes.appBar }}
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
          {openOverlay ? <UserOverlay /> : <div />}
          {!keycloak.authenticated ? (
            <Button
              onClick={
                () => keycloak.login()
                //setOverlayContext({ ...overlayContext, openOverlay: true })
              }
              color="inherit"
            >
              Login
            </Button>
          ) : (
            <Logout />
          )}
          {customerContext?.role.admin == true ? (
            <Button>Admin Tools</Button>
          ) : (
            <div></div>
          )}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            key={message ? message : undefined}
            open={openMessage}
            autoHideDuration={6000}
            onClose={() => {
              setOverlayContext({ ...overlayContext, openMessage: false });
            }}
            message={message ? message : undefined}
            action={
              <React.Fragment>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  sx={{ p: 0.5 }}
                  onClick={() => {
                    setOverlayContext({
                      ...overlayContext,
                      openMessage: false,
                    });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </React.Fragment>
            }
          />
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
