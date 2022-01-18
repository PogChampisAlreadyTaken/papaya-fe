import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Order } from "../../model";
import ShoppingItemComponent from "./ShoppingItemComponent";
import { OrderContext } from "../context/orderContext";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router";

const TypographyW = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);
const StyledButton = withStyles({
  root: {
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "#ffffff57",
    },
  },
})(Button);

interface Props {
  order: Order;
}

export default function OrderComponent(props: Props) {
  const { order } = props;
  const navigate = useNavigate();
  const [orderContext, setOrderContext] = React.useContext(OrderContext);
  const classes = useStyles();

  let amount = 0;
  order.shoppingItem.forEach(
    (item) => (amount += item.amount * item.meal.price)
  );

  return (
    <div className={classes.root}>
      <Grid container padding={3}>
        <Grid container border={1} borderColor={"white"}>
          <Grid item xs={4}>
            <TypographyW>Vergangene Bestellung</TypographyW>
          </Grid>
          <Grid item xs={4}>
            <TypographyW>Summe:</TypographyW>
            <TypographyW>{amount.toFixed(2)}€</TypographyW>
          </Grid>
          <Grid item xs={4}>
            <TypographyW>ID:</TypographyW>
            <TypographyW>{order.orderID}</TypographyW>
          </Grid>
        </Grid>
        <Grid container border={1} borderColor={"white"}>
          <Grid item xs={8}>
            {order.shoppingItem.map((item) => (
              <ShoppingItemComponent
                key={item.meal.mealName + item.meal.menuid}
                item={item}
              />
            ))}
          </Grid>
          <Grid item xs={4} margin={"auto"}>
            <StyledButton
              onClick={() => {
                setOrderContext({ shoppingItem: order.shoppingItem });
                navigate("/");
              }}
            >
              zur Bestellung hinzufügen
            </StyledButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    margin: "auto",
    marginTop: "10px",
    width: "80%",
  },
  paperRoot: {},
  header: {
    padding: 5,
  },
});
