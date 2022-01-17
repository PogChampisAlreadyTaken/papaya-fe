import { orderingSystemUrl } from "../endpoints";
import { Order, Customer } from "../model";
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
    body: JSON.stringify({
      customer: 1,
      shoppingItem: JSON.stringify(order)
    }),
  });

  return response;
}
