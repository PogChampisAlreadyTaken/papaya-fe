import { useState } from "react";
import { auth } from "../config/Firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import logging from "../config/Logging";

export default function RegisterUser(
  email: string,
  password: string,
  confirmPassword: string
): string {
  if (password != confirmPassword) {
    return "Passwörter stimmen nicht überein.";
  } else {
    //todo: validate email:  setError("Die angegebeneE-Mail ist nicht gültig");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        logging.info(result);
        //to do:  --> already signed in --> so close tab for now
        //setOpen(false); redirect
      })
      .catch((error) => {
        logging.error(error);

        if (error.code.includes("auth/weak-password")) {
          return "Bitte wähle ein stärkeres Passwort";
        } else if (error.code.includes("auth/email-already-in-use")) {
          return "E-Mail wird bereits schon bentutzt.";
        } else {
          return "Da ist etwas schiefgegangen. Probiere es später noch einmal";
        }
      });
  }
  return "";
}
