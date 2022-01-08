// @flow
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { MealContext } from "../components/context/mealContext";
import useQuery from "../config/queryParams";
import { makeStyles } from "@material-ui/core/styles";
import { Meal } from "../model";
import { getAllMeals } from "../request/mealManager";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {};
export function MealOverview(props: Props) {
  const query = useQuery();
  const classes = useStyles();
  const [meals, setMeals] = React.useContext(MealContext);
  const [updatedMeals, setupdatedMeals] = React.useState<Meal[]>([]);
  const loc = useLocation();

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
          <Accordion classes={{ root: classes.accordionRoot }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id={meal.menuid}>
              <Typography>
                {meal.menuid +
                  " " +
                  meal.mealName +
                  " " +
                  meal.price.toFixed(2) +
                  "€"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <Typography>{meal.ingredients}</Typography>
                <Button>Hinzufügen</Button>
              </div>
            </AccordionDetails>
          </Accordion>
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
