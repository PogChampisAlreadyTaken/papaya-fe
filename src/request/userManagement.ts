import { userManagementUrl } from "../endpoints";
import keycloak from "../keycloak";
import { Address, Customer } from "../model";
import { OpeningHour } from "../model/openingHour";

export function getUser(userId: string | undefined): Promise<Customer> {
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
      } else if (response.status === 403) {
        console.log("Access denied");
      } else if (response.status === 404) {
        //add user to database
        console.log("User was not found but will be created");
        const response = keycloak.loadUserProfile().then((profile) => {
          if (profile !== undefined) {
            const response = postUser(
              profile.id,
              profile.lastName,
              profile.firstName,
              0
            ).then((response) => {
              console.log("User erfolgreich erstellt");
              return response;
            });
            return response;
          }
        });
        return response;
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
): Promise<Address> {
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
): Promise<Customer> {
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
  return response;
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

export async function getDeliverTime(): Promise<number> {
  const response = await fetch(
    userManagementUrl + "/timemanagement/delivertime",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + keycloak.token,
      },
    }
  );
  return response.json();
}

export async function updateDeliverTime(delivertime: number) {
  console.log("PUT User");
  await fetch(userManagementUrl + "/timemanagement/delivertime", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + keycloak.token,
    },
    body: JSON.stringify({
      id: "1",
      time_in_minutes: delivertime,
    }),
  });
}

export function getOpeningHours(): OpeningHour[] {
  return [
    {
      day: "Montag",
      times: [
        ["11:00", "15:00"],
        ["17:00", "22:00"],
      ],
    },
    {
      day: "Mittwoch",
      times: [
        ["11:00", "15:00"],
        ["17:00", "22:00"],
      ],
    },
    {
      day: "Donnerstag",
      times: [
        ["11:00", "15:00"],
        ["17:00", "22:00"],
      ],
    },
    {
      day: "Freitag",
      times: [
        ["11:00", "15:00"],
        ["17:00", "22:00"],
      ],
    },
    {
      day: "Samstag",
      times: [
        ["11:00", "15:00"],
        ["17:00", "22:00"],
      ],
    },
    {
      day: "Sonntag",
      times: [
        ["11:00", "15:00"],
        ["17:00", "22:00"],
      ],
    },
  ];
}
