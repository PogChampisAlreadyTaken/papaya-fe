import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Meal } from "../../model";
import { ShoppingItem } from "../../model/shoppingItem";
const TypographyW = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

interface Props {
  item: ShoppingItem;
}

export default function ShoppingItemComponent(props: Props) {
  const { item } = props;
  return (
    <Card
      sx={{
        minWidth: 275,
        marginTop: 0.5,
        bgcolor: "#282c34f0",
        color: "white",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={10} flexDirection={"column"}>
            <TypographyW variant="h5">
              {item.meal.menuid + " "}
              {item.meal.mealName}
            </TypographyW>
            <TypographyW variant="body2">{item.meal.ingredients}</TypographyW>
            {item.meal.hotness}
          </Grid>
          <Grid item xs={2} flexDirection={"column"}>
            <div style={{ margin: "auto" }}>
              <TypographyW variant="h5">{item.amount}x</TypographyW>
              <TypographyW variant="h5">
                {item.meal.price.toFixed(2)}€
              </TypographyW>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
