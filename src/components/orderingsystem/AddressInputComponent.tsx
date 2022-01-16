// @flow

import {
  Typography,
  TextField,
  Card,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import * as React from "react";
import { AddressContext } from "../context/addressContext";
import { CustomerContext } from "../context/customerContext";
import { Customer } from "../../model";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

type Props = {};

export default function AddressInputComponent(props: Props) {
  const [customer, setCustomer] = React.useContext(CustomerContext);

  const classes = useStyles();

  const theme = createTheme({
    palette: {
      primary: { main: "#e91e63", contrastText: "#fff" },
      secondary: { main: "#03a9f4", contrastText: "#fff" },
    },
  });

  return (
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
          console.log("Hallo");
        }}
      >
        Bestellung abschließen
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
