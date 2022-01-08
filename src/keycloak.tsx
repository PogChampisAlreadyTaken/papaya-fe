import Keycloak from "keycloak-js";
import { getUser, postUser } from "./request/userManagement";

const keycloak = Keycloak({
  url: "https://keycloak-liimootbm.cloud.okteto.net/auth",
  realm: "Papaya",
  clientId: "papaya-frontend-dev",
});

keycloak.onAuthSuccess = () => {
  console.log("Hier sollte der User gecheckt werden");
  alert("Hilfe");
};

export const onKeycloakEvent = (event: unknown) => {
  if (event === "onAuthSuccess") {
    //check user
    if (keycloak.authenticated) {
      getUser(keycloak.subject).then((response) => {
        if (response.ok) {
          return response;
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
      });
    }
  }
};

export default keycloak;
