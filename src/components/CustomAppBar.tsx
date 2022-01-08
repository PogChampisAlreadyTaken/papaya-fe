import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Toolbar from "@mui/material/Toolbar";
import { useKeycloak } from "@react-keycloak/web";
import { User } from "firebase/auth";
import * as React from "react";
import Basket from "./Basket";
import { CustomerContext } from "./context/customerContext";
import { OverlayContext } from "./context/overlayContext";
import Logout from "./Logout";

export default function CustomAppBar() {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [customerContext, setCustomerContext] =
    React.useContext(CustomerContext);
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { openOverlay, message, openMessage } = overlayContext;
  const { keycloak, initialized } = useKeycloak();

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
          {!keycloak.authenticated ? (
            <Button
              onClick={() => {
                keycloak.login();
              }}
              color="inherit"
            >
              Login
            </Button>
          ) : (
            <Logout />
          )}
          {keycloak.hasResourceRole("admin") == true ? (
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
