import Keycloak from "keycloak-js";
import { getUser, postUser } from "./request/userManagement";

const keycloak = Keycloak({
  url: "https://keycloak-liimootbm.cloud.okteto.net/auth",
  realm: "Papaya",
  clientId: "papaya-frontend-dev",
});

export const onKeycloakEvent = (event: unknown) => {
  if (event === "onAuthSuccess") {
    if (keycloak.authenticated) {
      getUser(keycloak.subject);
    }
  }
};

export default keycloak;
