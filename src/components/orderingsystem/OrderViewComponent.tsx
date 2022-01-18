import { Typography, Card, Button } from "@mui/material";

import * as React from "react";
import { CustomerContext } from "../context/customerContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
  const { keycloak } = useKeycloak();

  const navigate = useNavigate();

  React.useEffect(() => {
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
    <Card
      style={{
        background: "#282c34f0",
        width: "20%",
        marginLeft: "20%",
        marginTop: "5%",
        marginBottom: "5%",
      }}
    >
      <Button
        sx={{
          color: "white",
          borderColor: "white",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        variant="outlined"
        onClick={() => {
          keycloak.login();
        }}
      >
        Bitte erstmal Anmelden!
      </Button>
    </Card>
  ) : customer?.customer_address_id === 0 ? (
    // user muss noch seine Addresse anlegen
    <Card
      style={{
        background: "#282c34f0",
        width: "20%",
        marginLeft: "20%",
        marginTop: "5%",
        marginBottom: "5%",
      }}
    >
      <Button
        sx={{
          color: "white",
          borderColor: "white",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        variant="outlined"
        onClick={() => {
          //overlay aufploppen
          setOverlayContext({ ...overlayContext, open: true });
        }}
      >
        Addresse hinzufügen
      </Button>
    </Card>
  ) : (
    <Card
      style={{
        background: "#282c34f0",
        width: "20%",
        marginLeft: "20%",
        marginTop: "5%",
        marginBottom: "5%",
      }}
    >
      <List>
        <ListItem
          style={{ color: "#fff", fontWeight: "bold", marginLeft: "9px" }}
        >
          Vorname:
        </ListItem>
        <Typography align="left" style={{ color: "#fff", marginLeft: "25px" }}>
          {customer?.first_name}
        </Typography>
      </List>
      <List>
        <ListItem
          style={{ color: "#fff", fontWeight: "bold", marginLeft: "9px" }}
        >
          Nachname:
        </ListItem>
        <Typography align="left" style={{ color: "#fff", marginLeft: "25px" }}>
          {customer?.last_name}
        </Typography>
      </List>
      <List>
        <ListItem
          style={{ color: "#fff", fontWeight: "bold", marginLeft: "9px" }}
        >
          Adresse:
        </ListItem>
        <Typography align="left" style={{ color: "#fff", marginLeft: "25px" }}>
          {customer?.address?.street + " " + customer?.address?.house_number}
        </Typography>
      </List>
      <List>
        <ListItem
          style={{ color: "#fff", fontWeight: "bold", marginLeft: "9px" }}
        >
          Stadt
        </ListItem>
        <Typography align="left" style={{ color: "#fff", marginLeft: "25px" }}>
          {customer?.address?.zip + " " + customer?.address?.city}
        </Typography>
      </List>
      <Button
        sx={{
          color: "white",
          borderColor: "white",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        variant="outlined"
        onClick={() => {
          orderContext.customer = customer?.id;
          postOrder(orderContext)
            .then((response) => {
              if (response.status === 200 || 201) {
                getMailNotification();
                orderContext.shoppingItem = [];
                setOrderContext(orderContext);
                window.localStorage.clear();
              } else {
                setOpenAlertError(true);
              }
            })
            .catch((error) => console.error(error));
          navigate("/sendorder");
        }}
        disabled={showButton}
      >
        {orderPlacementText}
      </Button>
    </Card>
  );
}

function setOpenAlertError(arg0: boolean) {
  throw new Error("Order could not be sent");
}
