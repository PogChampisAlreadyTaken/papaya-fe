import Keycloak from "keycloak-js";

let initOptions = {
  url: "https://0.0.0.0:8445/auth",
  realm: "Papaya",
  clientId: "papaya-frontend",
  onLoad: "login-required",
};

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak(initOptions);

export default keycloak;
