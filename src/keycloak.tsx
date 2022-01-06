import Keycloak from "keycloak-js";

const keycloak = Keycloak({
  url: "https://keycloak-liimootbm.cloud.okteto.net/auth",
  realm: "Papaya",
  clientId: "papaya-frontend-dev",
});

export default keycloak;
