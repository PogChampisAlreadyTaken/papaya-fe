import app, { auth } from "../config/Firebase-config";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import logging from "../config/Logging";
import { getUser, postAddress, postUser } from "../request/userManagement";
import { Customer } from "../model";
import { TryRounded } from "@mui/icons-material";
import { darkBlack } from "material-ui/styles/colors";
import firebase from "../config/Firebase-config";

import { useKeycloak } from '@react-keycloak/web'
import keycloak from "../keycloak";

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

    //keycloak.register()



    //create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //to do:  --> already signed in --> so close tab for now
        //setOpen(false); redirect
        //automatische Anmeldung
        //ich muss jetzt flag setzen für

        console.log(userCredential.user.uid);
        //create new address or get id of address
        if (
          city != null &&
          housenumber != null &&
          street != null &&
          zip != null
        ) {
          postAddress(city, housenumber, street, zip).then((resultId) => {
            postUser(
              userCredential.user.uid,
              firstName,
              lastName,
              resultId
            ).then((response) => {
              console.log(response);
            });
          });
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

interface props {
  setOpen: (isOpen: boolean) => void;
}

export function LoginUserWithFacebook(props: props) {
  const { setOpen } = props;

  //login with facebook
  const providerFacebook = new FacebookAuthProvider();

  signInWithPopup(auth, providerFacebook)
    .then((result) => {
      // The signed-in user info.
      getUser(result.user.uid).then((res) => {
        if (res == null) {
          //user is not registerd
          postUser(result.user.uid, "", "", 0);
          setOpen(false);
        }
        return res;
      });
      setOpen(false);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
}

export function LoginWithGoogle(props: props) {
  const { setOpen } = props;

  //login with google
  const googleProvider = new GoogleAuthProvider();
  auth.useDeviceLanguage();

  //sign in on a external page with google
  signInWithPopup(auth, googleProvider).then((result) => {
    //check if uuid is already in database
    getUser(result.user.uid).then((res) => {
      if (res == null) {
        //user is not registerd
        postUser(result.user.uid, "", "", 0);
        setOpen(false);
      }

      return res;
    });

    setOpen(false);
  });
}

export function GetAllUsers(props: props) {}

export function ChangePrivilege() {}
