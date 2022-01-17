import { Divider, Grid, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { Meal } from "../../model";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ShoppingItemComponent from "./ShoppingItemComponent";
const TypographyW = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

interface Props {
  order?: Order;
}

interface Order {
  orderID?: number;
  customer?: number;
  shoppingItem: shoppingItem[];
  remarks: String;
}

interface shoppingItem {
  meal: Meal;
  amount: number;
}

export default function OrderComponent(props: Props) {
  const { order } = props;
  const classes = useStyles();

  if (!order) {
    return <div>Bis jetzt noch keine Bestellungen</div>;
  }
  return (
    <div className={classes.root}>
      <Grid container padding={3}>
        <Grid container xs={12} border={1} borderColor={"white"}>
          <Grid item xs={4}>
            <TypographyW>Bestellung aufgegeben</TypographyW>
            <TypographyW>15.1.2022</TypographyW>
          </Grid>
          <Grid item xs={4}>
            <TypographyW>Summe</TypographyW>
            <TypographyW>EUR 35.99</TypographyW>
          </Grid>
          <Grid item xs={4}>
            <TypographyW>123</TypographyW>
          </Grid>
        </Grid>
        <Grid container xs={12} border={1} borderColor={"white"}>
          <Grid item xs={8}>
            {order.shoppingItem.map((item, index) => (
              <ShoppingItemComponent item={item} />
            ))}
          </Grid>
          <Grid item xs={4}>
            body2
          </Grid>
        </Grid>
        <Grid item xs={12} border={1} borderColor={"white"}>
          footer
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#2d3134f2!important",
    margin: "auto",
    marginTop: "10px",
    width: "80%",
  },
  paperRoot: {},
  header: {
    padding: 5,
  },
});
