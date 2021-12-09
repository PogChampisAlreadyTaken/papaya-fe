import { mealMangerUrl } from "../endpoints";

export async function getHelloMeal(): Promise<string> {
  const response = await fetch(mealMangerUrl + "/hello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.json();
}

export async function getMeal() {
  const response = await fetch(mealMangerUrl + "/meals", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.json();
}
