import { orderingSystemUrl } from "../endpoints";
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

export async function getFreeTable(dateTime: number): Promise<number> {
  const response = await fetch(orderingSystemUrl + "reservation/table", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(dateTime),
  });
  const body = await response.json();
  return body;
}

export async function postReservation(reservation: Reservation) {
  const response = await fetch(orderingSystemUrl + "reservation/table", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(reservation),
  });
  const body = await response.json();
  return body;
}
