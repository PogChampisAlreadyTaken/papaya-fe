// @flow
import { Button, Typography } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { MealContext } from "../components/context/mealContext";
import useQuery from "../config/queryParams";
import { makeStyles } from "@material-ui/core/styles";
import { Meal } from "../model";
import { getAllMeals } from "../request/mealManager";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { bgcolor } from "@mui/system";

type Props = {};
export function MealOverview(props: Props) {
  const query = useQuery();
  const classes = useStyles();
  const [meals, setMeals] = React.useContext(MealContext);
  const [updatedMeals, setupdatedMeals] = React.useState<Meal[]>([]);
  const loc = useLocation();
  const addToCart = () => {};

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
                onChange={addToCart}
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
