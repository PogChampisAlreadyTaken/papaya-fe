// @flow
import { Typography } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { MealContext } from "../components/context/mealContext";
import useQuery from "../config/queryParams";
import { getCategoryMeals, getHelloMeal } from "../request/mealManager";
import { getHelloOrder } from "../request/orderingSystem";
import { getHelloPayment } from "../request/paymentManager";
import { getHelloUser } from "../request/userManagement";

type Props = {};
export function MealOverview(props: Props) {
  const query = useQuery();
  const [meal, setMeal] = React.useState("");
  const [order, setOrder] = React.useState("");
  const [user, setUser] = React.useState("");
  const [payment, setPayment] = React.useState("");
  const loc = useLocation();
  const [meals, setMeals] = React.useContext(MealContext);

  React.useEffect(() => {
    if (meals.length === 0) {
      getCategoryMeals().then(setMeals);
    }
  }, []);

  React.useEffect(() => {
    console.log(query.get("category"));
    console.log(query.get("id"));
  }, [loc.search, query]);

  if (meals === undefined || meals === null) {
    setMeals([]);
  }

  return (
    <div>
      {console.log(meals)}{" "}
      {meals.map((meal) => (
        <Typography key={meal.id}>{meal.mealName}</Typography>
      ))}
      <Link to="/">About</Link>
    </div>
  );
}
