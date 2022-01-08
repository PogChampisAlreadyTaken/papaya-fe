import { userManagementUrl } from "../endpoints";
import keycloak from "../keycloak";

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

export async function getUser(userId: string | undefined) {
  //todo: maybe change to axios?
  const response = await fetch(userManagementUrl + "/user/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + keycloak.token,
    },
  });
  console.log(JSON.stringify(response.body));
  return response;
}

export async function postAddress(
  city: string,
  houseNumber: string,
  street: string,
  zip: string
) {
  console.log("POST Address");

  const response = await fetch(userManagementUrl + "/user/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + keycloak.token,
    },
    body: JSON.stringify({
      city: city,
      house_number: houseNumber,
      street: street,
      zip: zip,
    }),
  });
  return response.json();
}

export async function postUser(
  id?: string,
  last_name?: string,
  first_name?: string,
  customer_address_id?: number
) {
  console.log("POST User");

  const response = await fetch(userManagementUrl + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + keycloak.token,
    },
    body: JSON.stringify({
      id: id,
      last_name: last_name,
      first_name: first_name,
      customer_address_id: customer_address_id,
    }),
  });
  return response.json();
}
