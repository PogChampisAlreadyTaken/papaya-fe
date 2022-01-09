import { userManagementUrl } from "../endpoints";
import keycloak from "../keycloak";
import { Address, Customer } from "../model";

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

export function getUser(userId: string | undefined): Promise<Customer> {
  //todo: maybe change to axios?
  const response = fetch(userManagementUrl + "/user/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + keycloak.token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 403) {
        console.log("Access denied");
      } else if (response.status == 404) {
        //add user to database
        keycloak.loadUserProfile().then((profile) => {
          if (profile != undefined) {
            postUser(profile.id, profile.lastName, profile.firstName, 0).then(
              () => {
                //todo: logging
                console.log("User erfolgreich erstellt");
              }
            );
          }
        });
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      return data;
    });
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

export async function updateUser(
  id?: string,
  last_name?: string,
  first_name?: string,
  customer_address_id?: number
) {
  console.log("PUT User");

  const response = await fetch(userManagementUrl + "/user/" + id, {
    method: "PUT",
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
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  });
}

export async function getAddress(id?: number): Promise<Address> {
  console.log("GET Address");

  const response = await fetch(userManagementUrl + "/user/address/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + keycloak.token,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  });
  return response;
}
