// @flow
import { Button, Typography } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { MealContext } from "../components/context/mealContext";
import useQuery from "../config/queryParams";
import { makeStyles } from "@material-ui/core/styles";
import { Meal, Order } from "../model";
import { getAllMeals } from "../request/mealManager";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { OrderContext } from "../components/context/orderContext";
import { ShoppingItem } from "../model/shoppingItem";

type Props = {};
export function MealOverview(props: Props) {
  const query = useQuery();
  const classes = useStyles();
  const [meals, setMeals] = React.useContext(MealContext);
  const [orderContext, setOrderContext] = React.useContext(OrderContext);
  const [updatedMeals, setupdatedMeals] = React.useState<Meal[]>([]);
  const loc = useLocation();

  const addToCart = (meal: Meal) => {
    const old = orderContext.shoppingItem.find(
      (element) => element.meal === meal
    );
    const item: ShoppingItem = {
      meal,
      amount: 1,
    };

    if (old !== undefined) {
      item.amount = old.amount + 1;
      const index = orderContext.shoppingItem.indexOf(old);
      if (index > -1) {
        orderContext.shoppingItem.splice(index, 1);
      }
    }

    const updatedOrderContext = {
      ...orderContext,
      shoppingItem: [...orderContext.shoppingItem, item],
    };
    setOrderContext(updatedOrderContext);
  };

  React.useEffect(() => {
    if (meals.length === 0) {
      getAllMeals().then(setMeals);
    }
  }, []);

  React.useEffect(() => {
    let id = Number(query.get("id"));
    let updatedMeals = meals.filter((meal) => meal.categoryid === id);
    updatedMeals.sort((a, b) => (a.menuid > b.menuid ? 1 : -1));
    setupdatedMeals(updatedMeals);
  }, [loc.search, meals]);

  if (meals === undefined || meals === null) {
    setMeals([]);
  }

  return (
    <div className={classes.root}>
      {updatedMeals.map((meal) => {
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
              <Typography variant="h5" component="div">
                {meal.menuid + " "}
                {meal.mealName}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {meal.ingredients}
              </Typography>
              {meal.hotness}
            </CardContent>
            <CardActions
              disableSpacing
              sx={{ display: "flex", justifyContent: "right" }}
            >
              <Button
                size="small"
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={() => addToCart(meal)}
              >
                Gericht Hinzufügen
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: "50%",
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  accordionRoot: {
    color: "white!important",
    backgroundColor: "#2d3134f2!important",
  },
});
