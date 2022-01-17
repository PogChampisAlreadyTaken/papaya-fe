// @flow

import {
  Typography,
  TextField,
  Card,
  createTheme,
  ThemeProvider,
  Button,
  textFieldClasses,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import * as React from "react";
import { AddressContext } from "../context/addressContext";
import { CustomerContext } from "../context/customerContext";
import { Customer } from "../../model";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { OrderContext } from "../context/orderContext";
import { getMailNotification, postOrder } from "../../request/orderingSystem";
import { OverlayContext } from "../context/overlayContext";

type Props = {};

export default function OrderViewComponent(props: Props) {
  const [customer, setCustomer] = React.useContext(CustomerContext);
  const [orderContext, setOrderContext] = React.useContext(OrderContext);

  const [showButton, setShowButton] = React.useState<boolean>();
  const [orderPlacementText, setOrderPlacementText] = React.useState<String>();
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { keycloak, initialized } = useKeycloak();

  const classes = useStyles();
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: { main: "#e91e63", contrastText: "#fff" },
      secondary: { main: "#03a9f4", contrastText: "#fff" },
    },
  });

  let text = "Bestellung abschließen";

  React.useEffect(() => {
    console.log(customer);

    if (!keycloak.authenticated) {
      setOrderPlacementText("Bitte melden Sie sich an");
      setShowButton(true);
    } else {
      setOrderPlacementText("Bestellung abschließen");
      setShowButton(false);
    }
  }, [customer]);

  return !keycloak.authenticated ? (
    // kein angemeldetete User
    // Button mit, bitte anmelden!
    <Card className={classes.root}>
      <Button
        onClick={() => {
          keycloak.login();
        }}
      >
        Bitte erstmal Anmelden!
      </Button>
    </Card>
  ) : customer?.customer_address_id == 0 ? (
    // user muss noch seine Addresse anlegen
    <Card className={classes.root}>
      <Button
        onClick={() => {
          //overlay aufploppen
          setOverlayContext({ ...overlayContext, open: true });
        }}
      >
        Addresse hinzufügen
      </Button>
    </Card>
  ) : (
    <Card className={classes.root}>
      <List>
        <ListItem>{customer?.first_name}</ListItem>
      </List>
      <List>
        <ListItem>{customer?.last_name}</ListItem>
      </List>
      <List>
        <ListItem>
          {customer?.address?.street + " " + customer?.address?.house_number}
        </ListItem>
      </List>
      <List>
        <ListItem>
          {customer?.address?.zip + " " + customer?.address?.city}
        </ListItem>
      </List>
      <Button
        onClick={() => {
          postOrder(orderContext).then((order) => {
            getMailNotification();
            orderContext.shoppingItem = [];
            setOrderContext(orderContext);
            window.localStorage.clear();
          });
          navigate("/sendorder");
        }}
        disabled={showButton}
      >
        {orderPlacementText}
      </Button>
    </Card>
  );
}

const useStyles = makeStyles({
  input: {
    color: "blue",
  },
  root: {
    width: "30%",
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: "5%",
  },
});
