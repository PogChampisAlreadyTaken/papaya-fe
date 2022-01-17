import { orderingSystemUrl } from "../endpoints";
import { Order } from "../model";
import keycloak from "../keycloak";
import { Reservation } from "../model/reservation";

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

export async function getFreeTable(
  dateTime: number,
  seats: number
): Promise<number> {
  const response = await fetch(
    orderingSystemUrl + "/reservation/table/" + dateTime + "/" + seats,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const body = await response.json();
  return body;
}

export async function postReservation(reservation: Reservation) {
  const response = await fetch(
    orderingSystemUrl +
      "/reservation/" +
      reservation.reservationDate +
      "/" +
      reservation.name +
      "/" +
      reservation.tableid,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reservation.phonenumber,
    }
  );
  return response;
}

export async function postOrder(order: Order) {
  const response = await fetch(orderingSystemUrl + "/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(order),
  });
  return response;
}

export async function getMailNotification() {
  const email = await keycloak
    .loadUserProfile()
    .then((profile) => profile.email);
  if (email === undefined) {
    return null;
  }
  const response = await fetch(orderingSystemUrl + "/mail/" + email, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
}

export async function getOrder(customerId: string): Promise<Order[]> {
  const response = await fetch(orderingSystemUrl + "/order/" + customerId, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const body = await response.json();
  return body;
}
