import { auth } from "../config/Firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import logging from "../config/Logging";
import { postAddress, postUser } from "../request/userManagement";

export function RegisterUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  confirmPassword: string,
  street?: string,
  housenumber?: string,
  zip?: string,
  city?: string
): string {
  if (password !== confirmPassword) {
    return "Passwörter stimmen nicht überein.";
  } else {
    //todo: validate email:  setError("Die angegebeneE-Mail ist nicht gültig");
    //validate input!
    //create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        //to do:  --> already signed in --> so close tab for now
        //setOpen(false); redirect

        console.log(result.user.uid);
        //create new address or get id of address
        if (
          city != null &&
          housenumber != null &&
          street != null &&
          zip != null
        ) {
          postAddress(city, housenumber, street, zip).then((resultId) => {
            var response = postUser(
              result.user.uid,
              firstName,
              lastName,
              JSON.stringify(resultId)
            );
            console.log(response);
          });

          //ab hier wird nichts ausgeführt but why?
        }
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

export function LoginUser(email: string, password: string): string {
  console.log(email);
  console.log(password);
  if (email != null && password != null) {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        logging.info(result);
        logging.info(result.user.uid);
      })
      .catch((error) => {
        logging.error(error);

        if (error.code.includes("auth/unverified-email")) {
          return "Die E-Mail ist nicht verifiziert";
        } else if (error.code.includes("auth/user-not-found")) {
          return "Der Benutzter ist nicht bekannt";
        } else if (error.code.include("auth/invalid-email")) {
          return "Bitte gebe eine valide E-Mail ein";
        } else {
          return "Da ist etwas schiefgegangen. Probiere es später noch einmal";
        }
      });
  } else {
    return "Bitte Werte eingeben";
  }
  return "";
}
