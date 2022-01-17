import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { CustomerContext } from "../components/context/customerContext";
import OrderComponent from "../components/orderingsystem/OrderComponent";

export default function OrderHistory() {
  const [customerContext, setCustomerContext] = React.useContext(
    CustomerContext
  );
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography padding={2}>Meine Bestellungen</Typography>
      <OrderComponent />
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#white",
    opacity: "95%",
    width: "80%",
    margin: "auto",
    alignItems: "right",
  },
  header: {
    padding: 5,
  },
});
