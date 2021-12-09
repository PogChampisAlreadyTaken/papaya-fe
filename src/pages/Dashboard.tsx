import { Typography } from "@material-ui/core";
import React from "react";
import { Payment, Customer, Meal } from "../model";
import { getMeal } from "../request/mealManger";
import { getPayment } from "../request/paymentManger";
import { getUser } from "../request/userManagement";

export default function Dashboard() {
  const [meal, setMeal] = React.useState<Meal[]>([]);
  const [user, setUser] = React.useState<Customer | null>(null);
  const [payment, setPayment] = React.useState<Payment | null>(null);

  React.useEffect(() => {
    getMeal().then((res) => {
      setMeal(res);
    });
    getUser(4).then((res) => {
      setUser(res);
    });

    getPayment(1).then((res) => {
      setPayment(res);
    });
  }, []);

  React.useEffect(() => {
    console.log(meal);
    console.log(user);
    console.log(payment);
  }, [meal, user, payment]);
  return (
    <div>
      <Typography>user id: {user?.customerId}</Typography>
      <Typography>user last Name: {user?.lastName}</Typography>
      <Typography>user First Name: {user?.firstName}</Typography>
      <Typography>------------------------</Typography>
      <Typography>payment amount: {payment?.amount}</Typography>
      <Typography>payment description: {payment?.description}</Typography>
      <Typography>payment Payment Id: {payment?.id}</Typography>
      <Typography>payment customer Id: {payment?.customerId}</Typography>
      <Typography>------------------------</Typography>
      {meal.map((meal) => {
        return <Typography key={meal.id}>meal id: {meal.id}</Typography>;
      })}
    </div>
  );
}
