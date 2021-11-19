import { userManagementUrl } from "../endpoints";

export async function getHelloUser(): Promise<string> {
  const response = await fetch(userManagementUrl + "/hello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const body = await response.json();
  return body;
}
