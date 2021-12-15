import { mealManagerUrl } from "../endpoints";
import { Meal } from "../model";

export async function getHelloMeal(): Promise<string> {
  const response = await fetch(mealManagerUrl + "/hello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.json();
}

export async function getMeal() {
  const response = await fetch(mealManagerUrl + "/meals", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.json();
}

export async function getCategoryMeals(): Promise<Meal[]> {
  const response = await fetch(mealManagerUrl + "/meals/menus/2", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  return response.json();
}
