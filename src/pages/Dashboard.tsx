import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { MealContext } from "../components/context/mealContext";
import { Payment, Customer, Meal } from "../model";
import { getMeal } from "../request/mealManager";
import { getPayment } from "../request/paymentManager";
import { getUser } from "../request/userManagement";

export default function Dashboard() {
  const [meals, setMeals] = React.useContext(MealContext);

  React.useEffect(() => {}, [meals]);

  return (
    <div>
      <Typography>Dashboard</Typography>
      {meals.map((meal) => (
        <Typography key={meal.menuid}>{meal.menuid}</Typography>
      ))}
      <Link to="/meals">About</Link>
    </div>
  );
}
