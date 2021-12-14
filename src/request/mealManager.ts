import { mealManagerUrl } from "../endpoints";

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
