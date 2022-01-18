import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Toolbar from "@mui/material/Toolbar";
import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";
import { OverlayContext } from "./context/overlayContext";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import UserOverlay from "./usermanagement/UserOverlay";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminMenu from "./AdminMenu";

export default function CustomAppBar() {
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { open, message, openMessage } = overlayContext;
  const { keycloak } = useKeycloak();

  const classes = useStyles();
  const nav = useNavigate();

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
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => {
              nav("/");
            }}
          >
            Home
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
          {!keycloak.authenticated ? (
            <div />
          ) : (
            <IconButton
              onClick={() => {
                setOverlayContext({ ...overlayContext, open: true });
              }}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          )}
          {open ? <UserOverlay /> : <div />}
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
          {keycloak.hasRealmRole("admin") === false ? (
            <Button
              color="inherit"
              onClick={() => {
                nav("reservation");
              }}
            >
              Tisch reservieren
            </Button>
          ) : (
            <div></div>
          )}
          {keycloak.hasRealmRole("admin") === true ? (
            <AdminMenu></AdminMenu>
          ) : (
            <div></div>
          )}
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
