import { paymentServiceUrl } from "../endpoints";

export async function getHelloPayment(): Promise<string> {
  const response = await fetch(paymentServiceUrl + "/hello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const body = await response.json();
  return body;
}

export async function getPayment(id: number) {
  const response = await fetch(paymentServiceUrl + "/payments/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.json();
}
