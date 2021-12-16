import { mealManagerUrl } from "../endpoints";
import { Meal } from "../model";
import { Category } from "../model/category";

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

export async function getAllMeals(): Promise<Meal[]> {
  const response = await fetch(mealManagerUrl + "/meals/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  return response.json();
}

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(mealManagerUrl + "/category/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  return response.json();
}
