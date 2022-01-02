import { auth } from "../config/Firebase-config";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
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
              JSON.stringify(resultId)
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
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      // ...
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
  signInWithPopup(auth, googleProvider).then(() => {
    //check if uuid is already in database
    if (auth.currentUser) {
      setOpen(false);
      //getUser(auth.currentUser?.uid).then((result) => {
      //console.log(result);
      //});
    }
  });
}
