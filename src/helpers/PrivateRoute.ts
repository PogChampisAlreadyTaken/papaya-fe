import { Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({}) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? Button : null;
};

export default PrivateRoute;