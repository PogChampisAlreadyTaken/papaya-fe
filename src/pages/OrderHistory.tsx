import { Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { CustomerContext } from "../components/context/customerContext";
import OrderComponent from "../components/orderingsystem/OrderComponent";
import { Customer, Order } from "../model";
import { getOrder } from "../request/orderingSystem";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
const TypographyW = withStyles({
  root: {
    color: "#FFFFFF",
    padding: 10,
  },
})(Typography);

export default function OrderHistory() {
  const [customerContext, setCustomerContext] = React.useContext(
    CustomerContext
  );
  const [orders, setorder] = React.useState<Order[]>([]);
  const classes = useStyles();

  React.useEffect(() => {
    if (customerContext && customerContext.id) {
      getOrder(customerContext.id).then((order) => {
        setorder(order.reverse());
      });
    }
  }, [customerContext]);

  return (
    <Paper className={classes.root}>
      <TypographyW>Meine Bestellungen</TypographyW>
      {orders.length != 0 ? (
        orders
          .filter((o) => o.shoppingItem.length != 0)
          .map((order) => <OrderComponent key={order.orderID} order={order} />)
      ) : (
        <TypographyW>
          Bestellungen sind noch nicht geladen oder noch keine Aufgegeben
        </TypographyW>
      )}
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#2d3134f2!important",
    opacity: "95%",
    width: "80%",
    margin: "auto",
    alignItems: "right",
  },
  header: {
    padding: 5,
  },
});
