import { Card, CardContent } from "@mui/material";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Meal } from "../../model";
const TypographyW = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

interface Props {
  item: shoppingItem;
}

interface shoppingItem {
  meal: Meal;
  amount: number;
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
        <TypographyW variant="h5">
          {item.meal.menuid + " "}
          {item.meal.mealName}
        </TypographyW>
        <TypographyW variant="body2">{item.meal.ingredients}</TypographyW>
        {item.meal.hotness}
      </CardContent>
    </Card>
  );
}
