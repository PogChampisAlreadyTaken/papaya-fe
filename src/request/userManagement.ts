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
  id: string,
  last_name: string,
  first_name: string,
  customer_address_id: string
) {
  console.log("POST User");

  const response = await fetch(userManagementUrl + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
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
