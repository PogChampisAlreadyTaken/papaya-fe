import { mealMangerUrl } from "../endpoints";

export async function getHelloMeal(): Promise<string> {
  const response = await fetch(mealMangerUrl + "/hello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const body = await response.json();
  return body;
}
