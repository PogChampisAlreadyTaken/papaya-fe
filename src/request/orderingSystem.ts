import { orderingSystemUrl } from "../endpoints";

export async function getHelloOrder(): Promise<string> {
  const response = await fetch(orderingSystemUrl + "/hello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const body = await response.json();
  return body;
}
