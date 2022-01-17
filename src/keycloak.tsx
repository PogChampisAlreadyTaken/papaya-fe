import Keycloak from "keycloak-js";

const keycloak = Keycloak({
  url: "https://keycloak-liimootbm.cloud.okteto.net/auth",
  realm: "Papaya",
  clientId:
    window.location.hostname === "localhost"
      ? "papaya-frontend-dev"
      : "papaya-frontend",
});

export default keycloak;
