import { userManagementUrl } from "../endpoints";

export async function getHelloUser(): Promise<string> {
  const response = await fetch(userManagementUrl + "/hello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.json();
}

export async function getUser(userId: number) {
  const response = await fetch(userManagementUrl + "/user/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.json();
}
